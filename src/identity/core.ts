import { Observable, Subject } from "rxjs";
import { v4 as uuid } from "uuid";

const identityURL = "https://identity.bitclout.com";
var initialized = false;
var outboundRequests = {};
var pendingRequests = [];
var identityWindow;
var identityWindowSubject;
var iframe = null;
var storageGranted = new Subject();
var importingIdentities: any[];

const launch = (
  path?: string,
  params?: { publicKey?: string; tx?: string }
): Observable<any> => {
  let url = identityURL;
  if (path) {
    url += path;
  }

  let httpParams = "";

  if (params?.publicKey) {
    httpParams = httpParams.concat(`?publicKey=${params.publicKey}`);
  }
  if (params?.tx) {
    httpParams = httpParams.concat(`?tx=${params.tx}`);
  }
  if (httpParams !== "") {
    url.concat(httpParams);
  }

  // center the window
  const h = 1000;
  const w = 800;
  const y = window.outerHeight / 2 + window.screenY - h / 2;
  const x = window.outerWidth / 2 + window.screenX - w / 2;
  identityWindowSubject = new Subject();
  identityWindow = window.open(
    url,
    null,
    `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );

  return identityWindowSubject;
};

const sign = (payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  transactionHex: string;
}): Observable<any> => {
  return send("sign", payload);
};

const decrypt = (payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  encryptedHexes: string[];
}): Observable<any> => {
  return send("decrypt", payload);
};

const jwt = (payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
}): Observable<any> => {
  console.log(payload);
  return send("jwt", payload);
};

const handleInitialize = (event: MessageEvent) => {
  if (!initialized) {
    initialized = true;
    console.log("initializing identity...");
    iframe = document.getElementById("identity");
    for (const request of pendingRequests) {
      postMessage(request);
    }
    pendingRequests = [];
  }

  // acknowledge, provides hostname data
  respond(event.source as Window, event.data.id, {});
};

const handleStorageGranted = () => {
  storageGranted.next(true);
  storageGranted.complete();
};
const handleLogin = (payload: any) => {
  // if (identityWindow) {
  identityWindow.close();
  // }
  identityWindow = null;
  // if (identityWindowSubject) {
  identityWindowSubject.next(payload);
  identityWindowSubject.complete();
  // }
  identityWindowSubject = null;
};
const handleImport = (id: string) => {
  respond(identityWindow, id, { identities: importingIdentities });
};

const handleInfo = (id: string) => {
  respond(identityWindow, id, {});
};

const handleRequest = (event: MessageEvent) => {
  const {
    data: { id, method, payload },
  } = event;

  if (method === "initialize") {
    handleInitialize(event);
  } else if (method === "storageGranted") {
    handleStorageGranted();
  } else if (method === "login") {
    handleLogin(payload);
  } else if (method === "import") {
    handleImport(id);
  } else if (method === "info") {
    handleInfo(id);
  } else {
    console.error("Unhandled identity request");
    console.error(event);
  }
};

const handleResponse = (event: MessageEvent) => {
  const {
    data: { id, payload },
  } = event;

  const req = outboundRequests[id];
  req.next(payload);
  req.complete();
  delete outboundRequests[id];
};

const send = (method: string, payload: any) => {
  const req = {
    id: uuid(),
    method,
    payload,
    service: "identity",
  };

  const subject = new Subject();
  postMessage(req);
  outboundRequests[req.id] = subject;

  return subject;
};

const postMessage = (req: any) => {
  if (initialized) {
    iframe.contentWindow.postMessage(req, "*");
  } else {
    pendingRequests.push(req);
  }
};

// Respond to a received message
const respond = (window: Window, id: string, payload: any): void => {
  window.postMessage({ id, service: "identity", payload }, "*");
};

const identityHandler = (event) => {
  let data = event.data;
  const { service, method } = data;
  if (service !== "identity") {
    return;
  }
  if (method) {
    console.log(event);
    handleRequest(event);
  } else {
    console.log(event);
    handleResponse(event);
  }
};

export { identityHandler, launch, jwt, sign };
