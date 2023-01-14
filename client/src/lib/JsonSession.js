class JsonSession {
    #store = window.localStorage;
    #keyName = "sessionData";
  
    get sessionData() {
      const sessionDataString = this.#store.getItem(this.#keyName);
      if (sessionDataString) {
        return JSON.parse(sessionDataString);
      } else {
        return null;
      }
    }
  
    set sessionData(sessionData) {
      if (sessionData) {
        this.#store.setItem(this.#keyName, JSON.stringify(sessionData));
      } else {
        this.#store.removeItem(this.#keyName);
      }
    }
  }
  
  export default JsonSession;
  