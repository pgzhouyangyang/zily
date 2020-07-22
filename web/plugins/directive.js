import Vue from "vue";

Vue.directive("lazy", {
    inserted(el, binding) {
        var io = new IntersectionObserver(function(entries) {
            if(entries[0].isIntersecting && !el.loaded) {
                let img = new Image();
                img.src =  binding.value;
                img.onload = function(e) {
                    el.src = binding.value;
                    el.loaded = "success";
                    io.unobserve(el);
                }
                img.onerror = function(e) {
                    el.src = binding.value;
                    el.loaded = "error";
                    io.unobserve(el);
                }
            }
        });
        io.observe(el);
    }
});