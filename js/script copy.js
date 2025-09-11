async function fetchBooks(query) {
            const params = new URLSearchParams({
                target: "title",
                query,
                size: 8
            });
            const url = `https://dapi.kakao.com/v3/search/book?${params}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "KakaoAK edc8b7a1152b091d393e1922c066dc45"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            return response.json();
        }

        async function bookData() {
            try {
                // query와 section ID를 매핑
                const queries = [
                    { query: "자바스크립트", sectionId: "new" },
                    { query: "정원", sectionId: "sale" }
                ];

                for (const { query, sectionId } of queries) {
                    const data = await fetchBooks(query);

                    // 해당 섹션 내의 .box 요소 8개 선택
                    const section = document.querySelector(`#${sectionId}`);
                    const boxElements = section.querySelectorAll(".box");

                    boxElements.forEach((box, i) => {
                        const doc = data.documents[i];
                        if (!doc) return;

                        // <img>
                        const img = document.createElement("img");
                        img.src = doc.thumbnail;
                        box.appendChild(img);

                        // <h3> 제목
                        const h3 = document.createElement("h3");
                        h3.textContent = doc.title;
                        box.appendChild(h3);
                    });
                }
            } catch (error) {
                console.error('에러 발생:', error);
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

        bookData();