import JsonSession from "./JsonSession";

// Always guaranteed to return data:
// either retrieved from the JsonSession,
// or created using the init function
class GuaranteedJsonSession {
  #session;
  #initFunction;

  constructor(initFunction) {
    this.#session = new JsonSession();
    this.#initFunction = initFunction;
  }

  get sessionData() {
    return this.#session.sessionData || this.#initSessionData();
  }

  set sessionData(list) {
    this.#session.sessionData = list;
  }

  #initSessionData() {
    const data = this.#initFunction();
    this.#session.sessionData = data;

    return data;
  }
}

export default GuaranteedJsonSession;
