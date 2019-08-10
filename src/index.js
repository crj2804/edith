import './index.scss';

function createCalculator() {
  const form = document.forms.edith;
  const { elements } = form;
  const NERDFUNCS = ['expand', 'factor', 'partfrac', 'solve', 'diff', 'integrate', 'defint'];
  const OPTION_LABELS = ['Arithmetic(add,subt,mult,div)', 'Expand', 'Factor', 'Partial Fractions', 'Solve', 'Derivative', 'Integrate (indefinite)', 'Integrate (definite)'];
  const OPTION_NAMES = ['expand', ...NERDFUNCS];
  const [expand, factor, partfrac, solve, deriv, integrate, defint] = NERDFUNCS;

  function renderOptions() {
    const { nerdFunc } = elements;

    function createOption({ name, content }) {
      const option = document.createElement('option');
      option.setAttribute('value', name);
      option.innerHTML = content;
      nerdFunc.add(option);
    }

    OPTION_NAMES.forEach((option, index) => createOption({ name: option, content: OPTION_LABELS[index] }));
  }

  function Calculate() {
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

  const hiddenInput1 = document.getElementById("showText");
  const hiddenDeriv = document.getElementById("showDeriv");
  const hiddenXY = document.getElementById("showXY");

  function showHidden() {
    //hides or unhides textboxes based on selected option from list
    const selectId = elements.nerdFunc;

    hiddenDeriv.style.display = "none";

    hiddenInput1.style.display =
      selectId.value == defint ? "block" : "none";
    hiddenXY.style.display = selectId.value == "defint" ? "block" : "none";

    if (selectId.value == deriv) {
      hiddenDeriv.style.display = "";
      hiddenXY.style.display = "block";
    } else if (selectId.value == partfrac) {
      hiddenXY.style.display = "block";
    } else if (selectId.value == solve) {
      hiddenXY.style.display = "block";
    } else if (selectId.value == integrate) {
      hiddenXY.style.display = "block";
    } else {
      hiddenXY.style.display = "none";
    }
  }

  function hideHidden() {
    hiddenInput1.style.display = "none";
    hiddenXY.style.display = "none";
    hiddenDeriv.style.display = "none";
  }

  function init() {
    renderOptions();
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
