const container = document.querySelector(".newitems .swiper-wrapper");
const reconmmendedBooks = ["그리스인 조르바", "이토록 굉장한 세계", "돈의 심리학(30만 부 기념 스페셜 에디션", "마침내 특이점이 시작된다", "물질의 세계", "다정한 것이 살아남는다", "공정하다는 착각", "프로젝트 헤일메리", "넥서스", "백년의 고독1"]
const API_KEY = "edc8b7a1152b091d393e1922c066dc45"

async function fetchBooks(query) {
            const REST_API_KEY = '7ec0ff3e208807bf25acfcb953642046'
            const params = new URLSearchParams({
                target: "title",
                query,
                size: 50
            });
            const url = `https://dapi.kakao.com/v3/search/book?${params}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            return response.json();
        }
        async function bookData() {
            try {
                const querys = ["자바스크립트"];

                for (const q of querys) {
                    const data = await fetchBooks(q);
                    console.log(data);

                    // .box 요소 전체 선택
                const boxElements = document.querySelectorAll(".swiper-slide");

                // documents 데이터를 각 box에 대응하여 렌더링
                boxElements.forEach((box, i) => {
                    const doc = data.documents[i];

                    if (!doc) return; // 데이터가 부족할 경우 생략

                    // <img>
                    const img = document.createElement("img");
                    img.src = doc.thumbnail;
                    box.appendChild(img);

                    // <h3> 제목
                    const h3 = document.createElement("h3");
                    h3.textContent = doc.title;
                    box.appendChild(h3);

                    // <h6> 저자
                    const h6 = document.createElement("h6");
                    h6.textContent = doc.authors;
                    box.appendChild(h6);

                    // <p> 내용 일부
                    const p = document.createElement("p");
                    p.textContent = doc.contents.substring(0, 60);
                    box.appendChild(p);

                    // <button>
                    const btn = document.createElement("button");
                    btn.textContent = "click";
                    box.appendChild(btn);
                });
                }

            } catch (error) {
                console.log('에러발생', error);
            }
        }

        bookData();