class Search {

    // describe and create/initiate our object
    constructor(){
        this.openButton = document.querySelector('.js-search-trigger');
        this.closeButton = document.querySelector('.search-overlay__close');
        this.searchOverlay = document.querySelector('.search-overlay');
        this.searchField = document.querySelector('#search-term');
        this.resultsDiv = document.querySelector('#search-overlay__results');
        this.events();
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
    }

    // events
    events(){
        this.openButton.addEventListener('click', () => this.openOverlay());
        this.closeButton.addEventListener("click", () => this.closeOverlay());  
        document.addEventListener('keydown', e => this.keyPressDispatcher(e));
        this.searchField.addEventListener('keyup', () => this.typingLogic());
    }

    // methods (functions/actions)
    typingLogic(){
        if(this.searchField.value != this.previousValue){
            clearTimeout(this.typingTimer);
            if(this.searchField.value){
                if(!this.isSpinnerVisible){
                    this.resultsDiv.innerHTML = "<div class='loader'></div>";
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 1000);
            }else{
                this.resultsDiv.innerHTML = "";
                this.isSpinnerVisible = false;
            }
        }
        this.previousValue = this.searchField.value;
    }

    getResults(){
        $.getJSON('https://brb.macmar.dev/wp-json/wp/v2/events', (events) => {
            this.resultsDiv.innerHTML = `<h2>General Info</h2>`;
        })
    }

    keyPressDispatcher(e){
        if(e.keyCode == 83 && !this.isOverlayOpen && document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA"){
            this.openOverlay();
        }
        if(e.keyCode == 27 && this.isOverlayOpen){
            this.closeOverlay();
        }
    }

    openOverlay(){
        this.searchOverlay.classList.add('search-overlay--active');
        document.querySelector('body').classList.add('body-no-scroll');
        this.isOverlayOpen = true;
    }
    
    closeOverlay(){
        this.searchOverlay.classList.remove('search-overlay--active');
        document.querySelector('body').classList.remove('body-no-scroll');
        this.isOverlayOpen = false;
    }
}

export default Search;