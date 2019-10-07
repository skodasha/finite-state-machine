class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initState = config.initial;
        this.states = config.states;
        this.state = this.initState;
        this.prevState = null;
        this.undoState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.states[state]){
            throw new Error;
        } 
        this.prevState = this.state;
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.states[this.state].transitions[event]);
        this.undoState.length = 0;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initState;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        if(!event){
            for(let i in this.states){
                result.push(i);
            }
        }
        else{
            for(let i in this.states){
                if(event in this.states[i].transitions){
                    result.push(i);
                }
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state == this.initState){
            return false;
        }
        this.undoState.push(this.state);
        this.changeState(this.prevState);
        
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this.undoState.length){
            return false;
        }
        this.changeState(this.undoState.pop());
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = this.initState;
        this.state = this.initState;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
