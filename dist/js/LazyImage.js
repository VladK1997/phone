(function(){
    let checkImgId = document.getElementById("checkImgId");

        let img = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";
        let webpEnable = false;
    if(checkImgId) {
        checkImg = document.createElement("IMG");
        checkImgId.src = img;
        checkImgId.addEventListener("load", function () {
            console.log(checkImgId.width);
            if (checkImgId.width > 0) webpEnable = true;
        })
    }
        document.addEventListener("DOMContentLoaded", function () {
            var e = [].slice.call(document.querySelectorAll("img.lazy"));
            console.log(e.length);
            if ("IntersectionObserver" in window) {
                let t = new IntersectionObserver(function (e, n) {
                        e.forEach(function (e) {
                            if (e.isIntersecting) {
                                let n = e.target;
                                if(webpEnable && n.dataset.webpsrc && n.dataset.webpsrc.length > 0){
                                    n.setAttribute("src", n.dataset.webpsrc)
                                }else{
                                    n.setAttribute("src", n.dataset.src)
                                }
                                setTimeout(function () {
                                    n.classList.remove("lazy-out");
                                    n.removeAttribute('data-src');
                                    n.removeAttribute('data-webpsrc');
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
        document.addEventListener("DOMContentLoaded", function () {
            var bgArray = [].slice.call(document.querySelectorAll(".lazy-bg"));
            if ("IntersectionObserver" in window) {
                let observer = new IntersectionObserver(function (bgArray, n) {
                        bgArray.forEach(function (e) {
                            if (e.isIntersecting) {
                                var n = e.target;
                                console.log(webpEnable && n.dataset.src);
                                if (webpEnable && n.dataset.webpsrc && n.dataset.webpsrc.length > 0 ){
                                    n.style.backgroundImage = 'url("' + n.dataset.webpsrc + '")'

                                }else{
                                    n.style.backgroundImage = 'url("' + n.dataset.src + '")'
                                }
                                setTimeout(function () {
                                    n.classList.remove("lazy-out");
                                    n.removeAttribute('data-src');
                                    n.removeAttribute('data-webpsrc');
                                },0)
                                observer.unobserve(n);
                            }
                        })
                    }
                );
                bgArray.forEach(function (e) {
                    observer.observe(e)
                })
            }
        });

})();