## 구글 로그인

-   https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get#gsc.tab=0&gsc.q=gapi.client.sheets.spreadsheets.values

```js
// 초기 init
// secret 키는 env 파일로 처리
// client ID가 있어야 구글 시트에 접근가능하다.
// client ID는 구글 시트에서도 권한을 추가해줘야한다.
// SCOPE => 구글 시트 데이터 가지고 오려면 구글 드라이브도 사용해아함
export const handleClientInit = () => {
    return window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
        scope:
            "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
    });
};

class GoogleAuth extends React.Component {
    // 처음 실행시 handleClientInit() 실행시킨다.
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            handleClientInit().then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // signIn 액션
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(
                this.auth.currentUser.get().getBasicProfile().getEmail()
            );
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn(); // 실제 구글 로그인시킴
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div>로딩중</div>;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}
```

## Pagination

-   정렬: lodash 사용
-   https://lodash.com/docs/4.17.15

```js
const { dataset, totalPage } = useMemo(() => {
    // sortColumn: 정렬 키워드
    // filterColumn: 필터 키워드
    // currentPage: 현재 위치
    // pageSize: 몇개씩 볼건지
    const { sortColumn, filterColumn, pagination } = page;
    const { currentPage, pageSize } = pagination;

    if (data.length === 0) {
        return { dataset: [], columns: [], totalPage: 0 };
    }

    // 0번째 데이터 => 헤더
    // showColumns: 보여줄 컬럼들
    const titles = data[0];
    const labels = data[1];
    const showColumns = [
        "check_box",
        "state",
        "timestamp",
        "file_main",
        "name",
        "phone",
        "language",
        "add5",
        "add6",
        "detail",
        "send",
    ];

    const index = titles.indexOf(sortColumn.title);
    const condition =
        pagepath === "product"
            ? "state"
            : pagepath === "order"
            ? "language"
            : "x";

    // 필터(카테고리 선택)
    let filtered =
        filterColumn !== "all"
            ? data.filter(
                  (item) => item[titles.indexOf(condition)] === filterColumn
              )
            : data.slice(2); // 첫뻔째, 두번째 행은 제외 (컬럼 name과 label)

    filtered = filtered.length === 0 ? [{ value: "" }] : filtered;

    // 정렬
    const currentData = paginate(filtered, currentPage, pageSize);
    const sorted = _.orderBy(currentData, [index], [sortColumn.order]);
    const dataset = makeDataset(sorted, titles, labels, showColumns);
    return { dataset: dataset, totalPage: filtered.length };
}, [data, pagepath, page]);
```

## 구글시트 연동

-   https://docs.google.com/spreadsheets/d/1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY/edit#gid=1381853070

```js
// FETCH GOOGLE SHEET DATA
export const fetchData = (sheetName) => async (dispatch) => {
    try {
        const response = await window.gapi.client.sheets.spreadsheets.values.get(
            {
                spreadsheetId: "1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY",
                range: `${sheetName}!A1:AM`,
            }
        );
        const result = response.result.values;
        dispatch({
            type: FETCH_DATA,
            payload: result,
        });
    } catch (e) {
        console.error("fetchData Error: " + e);
    }
};
```

## 알림톡 발송

```js
// 초기 init
// 오렌지 알림톡 사용
//
export default axios.create({
    baseURL: "https://www.apiorange.com",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: process.env.REACT_APP_KAKAOSEND_AUTHORIZATION,
    },
});

// SEND KAKAO MESSAGE (알림톡)
// 알림톡 연동 문서
export const sendKakaoMsg = (sendObjList, inputs, type) => async (dispatch) => {
    const typeMap = {
        confirm: "접수완료",
        reject: "반려완료",
        done: "처리완료",
    };

    try {
        sendObjList.forEach(async (sendObj) => {
            let { tempNum, name, phone } = sendObj;

            phone =
                String(phone.value)[0] !== "0"
                    ? "0" + phone.value
                    : phone.value;
            let data = {
                tmp_number: tempNum,
                kakao_sender: "01092066598",
                kakao_phone: phone, //
                kakao_name: name.value,
                kakao_080: "N",
                kakao_res: "",
                kakao_res_date: "",
                TRAN_REPLACE_TYPE: "",
            };

            for (var i = 1; i < 11; i++) {
                let item = sendObj[`add${i}`];
                if (item) {
                    data[`kakao_add${i}`] = item.value
                        ? `\n▶ ${item.label}: ` + item.value
                        : "";
                }
            }
            const response = await kakaoSendAPI.post(
                "/api/send/notice.do",
                data
            );

            if (response.status === 200) alert("알림톡 발송이 완료되었습니다.");
        });

        const userRow = Object.values(inputs).map((item) => item.value);
        var newUserRow = [...userRow];
        newUserRow[2] = typeMap[type];
        dispatch(updateData(newUserRow));
    } catch (e) {
        console.error("kakaoSend error: ", e);
    }
};
```
