const palco=document.getElementById('palco')
const num_objetos=document.getElementById('num_objetos')
const txt_qtde=document.getElementById('txt_qtde')
const btn_add=document.getElementById('btn_add')
const btn_remover=document.getElementById('btn_remover')

let larguraPalco=palco.offsetWidth//obtendo largura da tela - no espaço palco
let alturaPalco=palco.offsetHeight//obtendo altura da tela - no espaço palco
let bolas=[]//array bolas
let numBola=0

class Bola{
    constructor(arrayBolas,palco){
        this.tam=Math.floor(Math.random()*15)+10//tam aleaorio de 15 a 25
        this.r=Math.floor(Math.random()*255)//r de cor aleatorio ate 255
        this.g=Math.floor(Math.random()*255)//g de cor aleatorio ate 255
        this.b=Math.floor(Math.random()*255)//b de cor aleatorio ate 255
        this.px=Math.floor(Math.random()*(larguraPalco-this.tam))//posição do eixo x aleatorio ate a larguraPalco - this.tam 'menos'
        this.py=Math.floor(Math.random()*(alturaPalco-this.tam))//posição do eixo y aleatorio ate a larguraPalco - thi.stam 'menos'
        this.velx=Math.floor(Math.random()*2)+0.5//velocidade x aleatoria
        this.vely=Math.floor(Math.random()*2)+0.5//velocidade y aleatoria
        this.dirx=(Math.random()*10)>5?1:-1//direção x aleatoria c/ retorn
        this.diry=(Math.random()*10)>5?1:-1//direção x aleatoria c/ retorn
        this.palco=palco//vem do parâmetro
        this.arrayBolas=arrayBolas//vem do parâmetro
        this.id=Date.now()+'_'+Math.floor(Math.random()*100000000000000)//Criando número de id para cada objeto, date now muito rápido, precisa colocoar em aleatorio
        this.desenhar()//desenhar bolinha no DOM
        this.controle=setInterval(this.controlar,10)//chamar função a cada 10 segundos
        this.eu=document.getElementById(this.id)//relacionando bolinha com DOM
        numBola++//a cada bola recebe mais 1
        num_objetos.innerHTML=numBola//nom_objetos recebe o valor total de bolas
    }

        minhaPos=()=>{//não interfere no projeto - não entendi
            return this.arrayBolas.indexOf(this)
        }

    remover=()=>{
        clearInterval(this.controle)//limpar intervalo de this.controle
        bolas=bolas.filter((b)=>{
            if(b.id != this.id){//se bola selecionada for diferente do id
                return b//se as bolas percorridas for diferente esta bola, retorne todas bolas diferentes desta específica
            }
        })
        this.eu.remove()//removendo do DOM
        numBola--
        num_objetos.innerHTML=numBola
    }

    desenhar=()=>{
        const div = document.createElement('div')
        div.setAttribute('id',this.id)
        div.setAttribute('class','bola')
        div.setAttribute('style',`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        this.palco.appendChild(div)
    }

    controle_bordas=()=>{
        if(this.px+this.tam >= larguraPalco){
            this.dirx=-1
        }else if(this.px <= 0){
            this.dirx=1
        }
        if(this.py+this.tam >= alturaPalco){
            this.diry=-1
        }else if(this.py <= 0){
            this.diry=1
        }
    }

    controlar=()=>{
        this.controle_bordas()
        this.px+=this.dirx*this.velx
        this.py+=this.diry*this.vely
        this.eu.setAttribute('style',`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        if((this.px > larguraPalco)||(this.py > alturaPalco)){
            this.remover()
        }
    }
}

window.addEventListener('resize',(evt)=>{//evento redimencionar, ao redimencionar o campo palco e pega os novos valores
    larguraPalco=palco.offsetWidth
    alturaPalco=palco.offsetHeight
})

btn_add.addEventListener('click',(evt)=>{
    const qtde=txt_qtde.value
    for(let i=0; i<qtde; i++){
        bolas.push(new Bola(bolas,palco))
    }
})

btn_remover.addEventListener('click',(evt)=>{
    txt_qtde.value=''
    txt_qtde.focus()
    bolas.map((b)=>{
        b.remover()
    })
})



