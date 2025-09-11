const container = document.querySelector(".newitems .swiper-wrapper");
const reconmmendedBooks = ["그리스인 조르바", "이토록 굉장한 세계", "돈의 심리학(30만 부 기념 스페셜 에디션", "마침내 특이점이 시작된다", "물질의 세계", "다정한 것이 살아남는다", "공정하다는 착각", "프로젝트 헤일메리", "넥서스", "백년의 고독1"]
const API_KEY = "edc8b7a1152b091d393e1922c066dc45"

async function fetchBooks() {
    for(const title of reconmmendedBooks) {
        try {
            const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(title)}`, {
                headers: {
                    Authorization: "KakaoAK edc8b7a1152b091d393e1922c066dc45"
                }
            });

            const data = await response.json();
           
            const book = data.documents[0];

            if(book) {
                const slideItem = document.createElement("div");
                slideItem.className = "swiper-slide";

                slideItem.innerHTML = ` <img src="${book.thumbnail}" alt="${book.title}"/><p>${book.title}</p>`

                container.appendChild(slideItem);
            }
        }catch (err) {
            console.log("책 정보 불러오기 실패:", err);
        }
    }

     var swiper = new Swiper(".newitems", {
      slidesPerView: 6,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
      
    });
}

fetchBooks();