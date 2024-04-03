export class LSGeolocation{
    str = null;
    items = [];
    constructor(){
        this.str = localStorage.getItem('geolocations');
        if(this.str === null) return;
        const data = JSON.parse(this.str)
        if(!Array.isArray(this.items)) return;
        this.items = data;
    }
    isEl = location => {
        const uuid = location.uuid;
        const { items, str } = this.getElements;
        if(str === null) return null;
        const candidate = items.find(item => item.uuid === uuid );
        return !!candidate;
    }
    save = location => {
        const { str, items } = this.getElements;
        
        if(str === null){
            const strLocation = JSON.stringify([location]);
            localStorage.setItem('geolocations', strLocation);
            return true;
        }
    
        items.unshift(location)
        localStorage.setItem('geolocations', JSON.stringify(items));
        return true
    };
    delete = uuid => {
        const { items, str } = this.getElements;
        if(str === null) return false;
        const data = items.filter(item => item.uuid !== uuid );
        localStorage.setItem('geolocations', JSON.stringify(data));
        return { uuid };

    };
    get length() {
        const { str, items } = this.getElements;
        if(str === null) return 0;
        return items.length;
    };

    get getElements(){
        const empty = { str: null, items: [] };
        const str = localStorage.getItem('geolocations');
        if(str === null) return empty;
        const items = JSON.parse(str);
        if(Array.isArray(items)) return { str, items };
        return empty;
    }

    get data(){ return this.getElements.items }
} 

