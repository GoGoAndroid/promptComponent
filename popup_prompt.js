

class PopUpPrompt extends HTMLElement {

  constructor() {
 
    super();
    window.prompt_this=this;

    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow;


    // Create spans
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'modal');


    const input = document.createElement('input');
    input.setAttribute('id', 'prompt');
 

    const okButton = document.createElement('button');
    okButton.innerHTML='ok'
    okButton.setAttribute('id', 'prompt_close');

    const cancelButton = document.createElement('span');
    cancelButton.innerText='⨯'
    cancelButton.setAttribute('id', 'cancel_prompt_close');
    cancelButton.setAttribute('class', 'close');


    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
    .modal {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding:1em;
          
            border: solid 1px #555;
            background-color: #eed;

            box-shadow:         0.3em -0.3em  rgba(0,0,0,0.6);
            -moz-box-shadow:    0.3em -0.3em  rgba(0,0,0,0.6);
            -webkit-box-shadow: 0.3em -0.3em  rgba(0,0,0,0.6);
            -o-box-shadow:      0.3em -0.3em  rgba(0,0,0,0.6);

            -moz-border-radius: 0.3em;
            -webkit-border-radius: 0.3em;
            border-radius: 0.3em; /* future proofing */
            -khtml-border-radius: 0.3em; /* for old Konqueror browsers */
    }
    input { margin:1em; }
    .close{ 
        position:absolute; 
        top: O em; 
        right:0.2em;
        margin-top:-1em;
        cursor:pointer;
        font-size:1.2em;
    }
    
    `;


    [style,wrapper].map( e=>shadow.appendChild(e) );
    [input,okButton,cancelButton].map( e=>wrapper.appendChild(e) );
    

  }


   connectedCallback() {

        let prompt_this_=this;
  
        this.checkEvent = new CustomEvent("close", {
      
                detail:{
                    getValue: ()=>prompt_this_.shadow.getElementById("prompt").value,
                    callBack: (V)=>window.prompt_this.callBack(V)
                }
            });

            this.shadow.getElementById("prompt_close").addEventListener("click", function(e) {
                prompt_this_.dispatchEvent(prompt_this_.checkEvent);
              
            });
            this.shadow.getElementById("cancel_prompt_close").addEventListener("click", function(e) {
                prompt_this_.shadow.getElementById("prompt").value=''
                prompt_this_.dispatchEvent(prompt_this_.checkEvent);
               
            });

        }

        changeType(type){
            this.shadow.getElementById("prompt").value=""
            this.shadow.getElementById("prompt").type=type
        }
        setCallBack(callBack_){
            console.log(callBack_)
            window.prompt_this.callBack=callBack_  
        }
}


customElements.define('popup-prompt', PopUpPrompt);



