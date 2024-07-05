<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>린넨실 요청서</title>
    <link rel="stylesheet" href="linen.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <style>
        #statusMessage {
            position: fixed;
            top: 70%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%; /* 너비를 더 넓게 설정 */
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 999;
            display: none;
            white-space: normal; /* 텍스트 줄 바꿈 설정 */
            font-size: 14px; /* 필요시 글꼴 크기 조정 */
        }

        .header-container {
            display: flex;
            justify-content: space-between; /* 요소를 양 끝으로 배치 */
            align-items: center; /* 세로 중앙 정렬 */
            padding: 10px;
        }

        .header-container h1:first-of-type {
            margin: 0;
            font-size: 25px; /* 공지사항의 글꼴 크기 */
        }

        .header-container h1:last-of-type {
            margin: 0;
            font-size: 18px; /* 린넨실 요청서의 글꼴 크기 */
            flex: 1;
            text-align: center; /* 중앙 정렬 */
        }
    </style>
</head>
<body>

    <!-- 팝업 컨테이너 -->
    <div id="popupContainer">
        <div id="popupContent">
            <h2>공지사항</h2>
            <p id="noticeContent">로딩 중...</p>
            <label>
                <input type="checkbox" id="hidePopupCheckbox"> 오늘 다시 보지 않기
            </label>
            <button id="closePopupButton">닫기</button>
        </div>
    </div>

    <div class="menu-bar" id="menuBar">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="dropdown-menu" id="dropdownMenu">
        <a href="공지사항.html">공지사항</a>
        <a href="#" id="adminPageLink">관리자 페이지</a>
    </div>
    <div class="content">
        <div class="header-container">
            <h1 id="noticeHeader">공지사항</h1>
            <h1>요청서</h1>
        </div>
    </div>

    <form id="linenRequestForm">
        <div class="form-group">
            <label for="ward">병동명 :</label>
  
        </div>
        <div class="form-group">
            <label for="requestDate">입고 날짜 :</label>
            <input type="text" id="requestDate" name="requestDate" readonly placeholder="입고 요청일을 선택해주세요.">
        </div>
        <div class="tabs">
            <div class="tab active" data-tab="sheet">시트/기타</div>
            <div class="tab" data-tab="normal">일반 환의</div>
            <div class="tab" data-tab="ortho">정형 환의</div>
            <div class="tab" data-tab="uniform">근 무 복</div>
            <div class="tab" data-tab="inventory">재고/요청</div>
        </div>
        <div id="sheet" class="form-section active">
            <table>
                <tr>
                    <th>품목</th>
                    <th>요청수량</th>
                </tr>
            </table>
        </div>
        <div id="normal" class="form-section">
            <table>
                <tr>
                    <th>품목</th>
                    <th>요청수량</th>
                </tr>
            </table>
        </div>
        <div id="ortho" class="form-section">
            <table>
                <tr>
                    <th>품목</th>
                    <th>요청수량</th>
                </tr>
            </table>
        </div>
        <div id="uniform" class="form-section">
            <table>
                <tr>
                    <th>품목</th>
                    <th>요청수량</th>
                </tr>
            </table>
        </div>
        <div id="inventory" class="form-section">
            <div class="camera-section">
                <div class="button-container">
                    <button type="button" id="cameraButton">
                        <i class="fa fa-camera camera-icon"></i> 카메라 촬영
                    </button>
                    <input type="file" id="inventoryPhoto" style="display:none;" accept="image/*">
                </div>
                <button type="submit" id="submitBtn">
                    <i class="fas fa-paper-plane submit-icon"></i> 요청하기
                </button>
                <img id="preview" src="#" alt="Preview" style="max-width:100%; display:none;">
            </div>
        </div>
        <div id="statusMessage">요청을 전송중 입니다..잠시만 기다려주세요..</div>
    </form>

    <div id="responseMessage"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="linen_request_form.js"></script>
    <script src="js.js"></script>
    <script>
        // 공지사항 링크 클릭 시 처리
        document.addEventListener('DOMContentLoaded', function() {
            const noticeHeader = document.querySelector('#noticeHeader'); // 첫 번째 h1 요소 선택
            noticeHeader.addEventListener('click', function() {
                window.location.href = '공지사항.html'; // 공지사항 페이지로 이동
            });
        });

// 팝업 닫기 함수
        function closePopup() {
            $('#popupContainer').hide();
        }

        $(document).ready(function() {
            $('#adminPageLink').click(function(e) {
                e.preventDefault();
                var password = prompt("관리자 페이지 암호를 입력하세요.");
                if (password === "911206") { // 관리자 페이지 암호 설정
                    window.location.href = "admin.html";
                } else {
                    alert("암호가 일치하지 않습니다.");
                }
            });

            const sheetItems = [
                { name: '대 시 트', key: '대시트_요청수량' },
                { name: '반 시 트', key: '반시트_요청수량' },
                { name: '베 갯 잇', key: '베갯잇_요청수량' },
                { name: '중 환 의', key: '중환의_요청수량' },
                { name: '이 불', key: '이불_요청수량' },
                { name: '얼음주머니', key: '얼음포_요청수량' },
                { name: '억 제 대', key: '억제대_요청수량' },
                { name: '수 건', key: '수건_요청수량' }
            ];

            const requiredSizes = ['3XL', '2XL', 'XL', 'L'];
            const sizes = ['4XL', '3XL', '2XL', 'XL', 'L', 'M', 'S'];
            const types = ['상의', '하의'];

            function populateTable(sectionId, items) {
                const table = document.querySelector(`#${sectionId} table`);
                items.forEach(item => {
                    const row = document.createElement('tr');
                    const itemCell = document.createElement('td');
                    itemCell.textContent = item.name;
                    const inputCell = document.createElement('td');
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.name = item.key;
                    input.min = 0;
                    inputCell.appendChild(input);
                    row.appendChild(itemCell);
                    row.appendChild(inputCell);
                    table.appendChild(row);
                });
            }

            populateTable('sheet', sheetItems);

            function generateClothingItems(sizes, types) {
                return sizes.flatMap(size => 
                    types.map(type => ({
                        name: `${size} ${type}`,
                        key: `${size}_${type}_요청수량`
                    }))
                );
            }

            populateTable('normal', generateClothingItems(sizes, types));
            populateTable('ortho', generateClothingItems(sizes.slice(1), types)); 
            populateTable('uniform', generateClothingItems(requiredSizes, types)); 
        });
    </script>
</body>
</html>
