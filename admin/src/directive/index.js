import Vue from "vue";

Vue.directive("numAdd", {
    update(el, binding) {
        if(binding.undefined === "undefined" && binding.oldValue == binding.value) {
            return
        }
        let count = binding.value || 0;
        let num = 0;
        let timer = setInterval(()=> {
            let diff = count - num;
            let speed = Math.ceil(diff / 20);
            num += speed;
            if(num >= count) {
                num = count
              clearInterval(timer)
            }
            el.innerHTML = num
          }, 40)
    }   

})