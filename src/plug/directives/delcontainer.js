
export default {
    bind: function bind(el, binding) {
        el.setAttribute("data-luozz", binding.arg);
        el.onclick = function() {
            document.querySelector("[data-luozz='" + binding.arg + "']").parentNode.remove();
        }
    }
};