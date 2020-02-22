(function(){
    document.addEventListener("DOMContentLoaded", function () {
        var e = [].slice.call(document.querySelectorAll("[data-appear]"));
        if ("IntersectionObserver" in window) {
            let t = new IntersectionObserver(function (e, n) {
                    e.forEach(function (e) {
                        if (e.isIntersecting) {
                            let n = e.target;
                                n.classList.add('appeared');

                            setTimeout(function () {
                                t.unobserve(n);
                            },0)
                        }
                    })
                }
            );
            e.forEach(function (e) {
                t.observe(e)
            })
        }
    });
})();