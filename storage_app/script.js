const APP = {
    list: null,
    names: [],
    key: null,
    storage: null,
    init(key) {
    
      APP.key = key;
      APP.storage = window.localStorage;
      return APP;
    },
    getStorage() {
     
      let ref = APP.storage.getItem(APP.key);
      if (!ref) {
        APP.storage.setItem(APP.key, JSON.stringify([]));
      }
      APP.names = JSON.parse(ref);
      return APP;
    },
    addName(nm, list) {
      
      let obj = {
        id: Date.now(),
        name: nm,
      };
      APP.names.push(obj);
      APP.saveNames();
      if (list) {
        APP.buildList(list);
      }
    },
    removeName(nm) {
      
      APP.names = APP.names.filter((obj) => obj.name !== nm);
      APP.saveNames();
    },
    updateName(oldName, newName) {
      
      APP.names = APP.names.map((obj) => {
        if (obj.name === oldName) {
          return {
            id: obj.id,
            name: newName,
          };
        }
        return obj;
      });
      APP.saveNames();
    },
    saveNames() {
      
      APP.storage.setItem(APP.key, JSON.stringify(APP.names));
    },
    clearNames() {
     
      APP.names = [];
      APP.storage.clear();
    },
    buildList(element) {
     
      if (!APP.names) {
        APP.names = [];
      }
      element.innerHTML = APP.names
        .map((obj) => {
          return `<li data-key="${obj.id}">${obj.name}</li>`;
        })
        .join('\n');
    },
  };