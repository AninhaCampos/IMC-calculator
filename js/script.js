// IMC DATA - info
const data = [ //uma matriz que contém os dados para classificação do IMC
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];


  //Selecao de elementos

  const imctable = document.querySelector("#imc-tabela"); //tabela

  const heightInput = document.querySelector("#height"); //altura
  const weightInput = document.querySelector("#weight"); //peso
  const calcBtn = document.querySelector("#calc-btn"); //botao calcular
  const clearBtn = document.querySelector("#clear-btn"); //botao limpar

  const calcContainer = document.querySelector("#calc-container"); //container do calculo
  const ResultContainer = document.querySelector("#result-container"); //container geral de resultado do IMC

  const imcNumber = document.querySelector("#imc-number span"); //resultado do imc
  const imcInfo = document.querySelector ("#imc-info span"); //informacoes do imc

  const backBtn = document.querySelector("#botao-voltar"); //botao voltar

    //Funcoes
    function createTable(data){
        data.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("table-data");

            const classification = document.createElement("p");
            classification.innerText = item.classification;

            const info = document.createElement("p");
            info.innerText = item.info;

            const obesity = document.createElement("p");
            obesity.innerText = item.obesity;

            div.appendChild(classification);
            div.appendChild(info);
            div.appendChild(obesity);

            imctable.appendChild(div);

        });
    }

    function cleanInputs (){ //função que limpa os campos de entrada de altura e peso
      heightInput.value="";
      weightInput.value="";
      imcNumber.classList = "";
      imcInfo.classList = "";
    }

    function validDigits(text){ //funcao para limitar o numero de caracteres e que remove caracteres não numéricos dos campos de entrada de altura e peso
      return text.replace(/[^0-9,]/g, "");
    }

    function calcImc(weight,height){ //funcao para calcular o imc com as informacoes dadas pelo usuario
      const imc = (weight / (height * height)).toFixed(1);

      return imc;
    }

    function showOrHideResults(){ //função que mostra ou oculta os resultados da calculadora.
      calcContainer.classList.toggle("hide");
      ResultContainer.classList.toggle("hide");

    }

    //Inicializacao do site
    createTable(data); //função que cria a tabela de classificação do IMC com base nos dados fornecidos

    //Eventos

    [heightInput,weightInput].forEach((el) => {

      el.addEventListener("input", (e) =>{

        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;

      });
    });

    calcBtn.addEventListener("click", (e) => {

      e.preventDefault();

      const weight = +weightInput.value.replace(",",".");
      const height = +heightInput.value.replace(",",".");

      console.log(weight,height);

      if (!weight || !height) return;

      const imc = calcImc(weight,height);
      let info;

      data.forEach((item) => {
        if(imc >= item.min && imc <= item.max){
          info = item.info;
        }
      });

      if(!info) return;

      imcNumber.innerText = imc;
      imcInfo.innerText = info;

      switch(info){
        case "Magreza":
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
          break;
        case "Normal":
          imcNumber.classList.add("good");
          imcInfo.classList.add("good");
          break;
        case "Sobrepeso":
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
          break;
        case "Obesidade":
          imcNumber.classList.add("medium");
          imcInfo.classList.add("medium");
        case "Obesidade grave":
          imcNumber.classList.add("high");
          imcInfo.classList.add("high");
          break;
      }

      showOrHideResults();

    });

    clearBtn.addEventListener("click", (e) => { //colocar a funcao no botao limpar
      
      e.preventDefault();
      
      cleanInputs();
    });

    backBtn.addEventListener("click" , () =>{ //colocar funcao no botao voltar

      cleanInputs();
      showOrHideResults();
    });