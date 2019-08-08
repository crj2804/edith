import './index.scss';

function createCalculator() {
  const hiddenInput1 = document.getElementById("showText");
  const hiddenDeriv = document.getElementById("showDeriv");
  const hiddenXY = document.getElementById("showXY");

  function Calculate() {
    const form = document.forms.edith;
    const { elements } = form;
    const { expression, diff, fromInput, toInput, xyres } = elements;

    function getQueryString() {
      const values = [fromInput.value, toInput.value, xyres.value, diff.value];
      const filledValues = values.filter(val => Boolean(val));
      const res = filledValues.reduce((prev, cur) => `${prev ? `${prev},` : ''} ${cur}`, expression.value);
      return res;
    }

    const resultEl = document.getElementById("Result");
    resultEl.value = nerdamer(`${elements.nerdFunc.value}(${getQueryString()})`);

    if (elements.nerdFunc.value === "factor" && !result.toString().includes("(")) {
      inputError.classList.remove("hidden");
    }
  }

  function showHidden() {
    //hides or unhides textboxes based on selected option from list
    var selectId = document.getElementById("stark");
    hiddenInput1.style.display =
      selectId.value == "defint" ? "block" : "none";
    hiddenXY.style.display = selectId.value == "defint" ? "block" : "none";

    if (selectId.value == "diff") {
      hiddenDeriv.style.display = "";
      selectId.value == "diff" ? "block" : "none";
      hiddenXY.style.display =
        selectId.value == "diff" ? "Block" : "none";
    } else if (selectId.value == "partfrac") {
      hiddenDeriv.style.display = "none";
      hiddenXY.style.display =
        selectId.value == "partfrac" ? "block" : "none";
    } else if (selectId.value == "solve") {
      hiddenDeriv.style.display = "none";
      hiddenXY.style.display = selectId.value == "solve" ? "block" : "none";
    } else if (selectId.value == "integrate") {
      hiddenDeriv.style.display = "none";
      hiddenXY.style.display =
        selectId.value == "integrate" ? "block" : "none";
    } else if (selectId.value == "defint") {
      hiddenDeriv.style.display = "none";
    } else {
      hiddenDeriv.style.display = "none";
      hiddenXY.style.display = "none";
    }
  }

  function hideHidden() {
    hiddenInput1.style.display = "none";
    hiddenXY.style.display = "none";
    hiddenDeriv.style.display = "none";
  }

  function init() {
    document.getElementById("calc").addEventListener("click", () => {
      Calculate();
    });
  }

  return {
    init,
    showHidden,
    hideHidden,
  };
}

window.myApp = createCalculator();

window.myApp.init();
