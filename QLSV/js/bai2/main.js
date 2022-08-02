/**
 * Chứa các hàm xử lý tương tác UI
 */
//Thêm SInh VIên
//hàm rút gọn cú pháp gêtlementByid
//Global variable
//mảng SV và các chức năng cảu DanhSachSinhVien
var dssv = new DanhSachSinhVien();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}
function themSinhVien() {
    var maSV = getELE("txtMaSV").value;
    var tenSV = getELE("txtTenSV").value;
    var emailSV = getELE("txtEmail").value;
    var passwordSV = getELE("txtPass").value;
    var dateSV = getELE("txtNgaySinh").value;
    var khoahocSV = getELE("khSV").value;
    var toan = getELE("txtDiemToan").value;
    var ly = getELE("txtDiemLy").value;
    var hoa = getELE("txtDiemHoa").value;

    console.log(maSV, tenSV, emailSV, passwordSV, dateSV, khoahocSV, toan, ly, hoa);

    var isValid = true;
    //các bước kiểm tra dữ liệu
    /**
     * issue: tên sinh viên có value, masv ko có value => vẫn cho thêm sinh viên
     * Expected: chỉ được thêm sv khi tất cả các dữ liệu đều thêm.
     * Nếu có 1 dữ liệu không hợp lệ => thông báo + không được thêm sv
     * Root cause: do dấu = (gán) chỉ giữ lại kt kết quả cuối cùng, các kết quả trước bị ghi đè mất
     * Solution:
     * C1: && // so sánh true/ false=> check => false && true => false
     * nhược điểm dài code
     * C2: tách các bước kiểm tra => dễ đọc code
     * &:tính toán binary(010101)
     */
    // kiểm tra masv (KIểm tra rổng, không được trùng)
    isValid &= validation.checkEmpty(maSV, "spanMaSV", "Chố này không được để trống") && validation.checkID(maSV, "spanMaSV", "mã không được trùng", dssv.mangSV);
    // kiểm tra tensv (KIểm tra rổng, kiểm tra ký tự chữ)
    isValid &= validation.checkEmpty(tenSV, "spanTenSV", "Chố này không được để trống") && validation.checkname(tenSV, "spanTenSV", "Tên sinh viên chứa ký tự chữ");
    // kiểm tra emailSV (KIểm tra rổng, kiểm tra formmat gmail)
    isValid &= validation.checkEmpty(emailSV, "spanEmailSV", "Chố này không được để trống") && validation.checkemail(emailSV, "spanEmailSV", "email chứa đúng định dạng");
    // kiểm tra passwordSV (KIểm tra rổng, kiểm tra formmat pass)
    isValid &= validation.checkEmpty(passwordSV, "spanMatKhau", "Chố này không được để trống") && validation.checkpassword(passwordSV, "spanMatKhau", "giới hạn 6-8 ký tự");
    // kiểm tra toan (KIểm tra rổng, kiểm tra formmat -số, 0<=10)
    isValid &= validation.checkEmpty(toan, "spanToan", "Chố này không được để trống") && validation.checkscore(toan, "spanToan", "không dấu âm, nhập 1->10");
     // kiểm tra khoahocSV (người dùng có chọn lựa chọn cái đầu tiên )
     isValid &= validation.checkdropdown("khSV", "spanKhoaHoc", "Khóa học chưa được chọn");


    if (isValid) {
        //các dữ liệu hợp lệ
        // tạo thể hiện của SinhVIeen
        var sv = new SinhVien(maSV, tenSV, emailSV, passwordSV, dateSV, khoahocSV, Number(toan), Number(ly), Number(hoa));
        sv.tinhDTB();
        console.log(sv);

        //thêm sv vào mangSV;
        dssv.themSV(sv);
        console.log(dssv.mangSV);

        //gọi hàm hiện thị
        hienthiDS(dssv.mangSV);
        setlocalstorage();
        resetform();
    }

}
function setlocalstorage() {
    // đối tượng có sắn của js giúp thao tác về lacal storage của browers
    //dữ liệu lưu trữ ở localstorage kiểu JSON
    // chuyển tử array =>JSON
    //khi mảng sv thay đổi gọi hàm set localstoage để cập nhật cho local

    localStorage.setItem("SinhVien", JSON.stringify(dssv.mangSV));
}
function getlocalstorage() {
    //getItem => trả về dữ liệu JSON
    // Json => array
    // localstorage chỉ lưu ở truyền đang chạy ứng dụng
    if (localStorage.getItem("SinhVien") != undefined) {
        dssv.mangSV = JSON.parse(localStorage.getItem("SinhVien"));
    }
    hienthiDS(dssv.mangSV);
}
getlocalstorage();
/**
 * 
 * input mangsv
 * b1: duyệt mạng dể lấy ra từng đối tượng sv
 * b2: tạo ra hàng dau tiên sv
 * b3: tạo từng td, dưa các thuộc tính cảu sinh viên vào td
 * b4: đem tất cá thẻ tr hiện thi lên UI
 * 
 * output các thẻ tr để hiện thị lên html
 * 1 thẻ tr là 1 sinh vien
 * từng td là từng thuộc tính của sv
 * 
 */
//hiện thị danh sách sinh viên
function hienthiDS(mangSV) {
    console.log(mangSV);
    // map(): hàm giúp duyệt mảng=>lấy ra từng phần tử cảu mảng(cú pháp ngắn gọn)
    // ham1(ham2())=> callback function

    var content = "";
    mangSV.map(function (sv) {
        console.log(sv);
        // string template (template literal), ``
        content += ` 
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.emailSV}</td>
                <td>${sv.dateSV}</td>
                <td>${sv.khoahocSV}</td>
                <td>${sv.dtb}</td>
                <td>
                    <button class="btn btn-info " onclick="xemChitiet('${sv.maSV}')">Xem</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')">Xõa</button>
                </td>
            </tr>
        `;
        // console.log(trELE);
        // content += trELE;
    });
    console.log(content);
    getELE("tbodySinhVien").innerHTML = content;
}
/**
 * Xóa => xóa phần tử khỏi mảng
 * => tìm được vị trí (index của phần tử cần xóa)
 * => Dựa vào masv(trường dữ liệu bắt buộc và duy nhất) đề tìm kiếm sv
 * 
 */
function xoaSinhVien(ma) {
    console.log(ma);
    dssv.xoaSV(ma);
    hienthiDS(dssv.mangSV);
    setlocalstorage(dssv.mangSV);
}
/**
 * Cập nhật
 * + xem thông tin
 * => click button Xem
 * => lấy thông tin cảu sv cần xem
 * =
 * >hiện thị thông tin sv
 * +Cập nhật
 * => edit thông tin caanf sửa
 * => sclick button cập nhật
 * =>lấy giá trị từ form => luuw vào đối tượng SV
 * => tìm vị trí sv cần cập nhật => gán giá trị sv mới vào vị trí tìm thấy
 * */
function xemChitiet(ma) {
    console.log(ma)
    var viTri = dssv.timViTri(ma);
    if (viTri > -1) {
        // tìm thấy
        var svTim = dssv.mangSV[viTri];
        console.log(svTim);

        getELE("txtMaSV").value = svTim.maSV;
        getELE("txtMaSV").disabled = true;
        getELE("txtTenSV").value = svTim.tenSV;
        getELE("txtEmail").value = svTim.emailSV;
        getELE("txtPass").value = svTim.passwordSV;
        getELE("txtNgaySinh").value = svTim.dateSV;
        getELE("khSV").value = svTim.khoahocSV;
        getELE("txtDiemToan").value = svTim.toan;
        getELE("txtDiemLy").value = svTim.ly;
        getELE("txtDiemHoa").value = svTim.hoa;
    }
}
function capnhatSinhVien() {
    var maSV = getELE("txtMaSV").value;
    var tenSV = getELE("txtTenSV").value;
    var emailSV = getELE("txtEmail").value;
    var passwordSV = getELE("txtPass").value;
    var dateSV = getELE("txtNgaySinh").value;
    var khoahocSV = getELE("khSV").value;
    var toan = getELE("txtDiemToan").value;
    var ly = getELE("txtDiemLy").value;
    var hoa = getELE("txtDiemHoa").value;

    console.log(maSV, tenSV, emailSV, passwordSV, dateSV, khoahocSV, toan, ly, hoa);
    // tạo thể hiện của SinhVIeen
    var sv = new SinhVien(maSV, tenSV, emailSV, passwordSV, dateSV, khoahocSV, Number(toan), Number(ly), Number(hoa));
    sv.tinhDTB();
    console.log(sv);

    dssv.capnhatSV(sv);
    hienthiDS(dssv.mangSV);
    setlocalstorage(dssv.mangSV);

    resetform();
}
function resetform() {
    // clear các giá trị ở trên forrm giúp user nhập nội dung mới
    getELE("formQLSV").reset();
    getELE("txtMaSV").disabled = false;
}

function timkiemten() {
    var tukhoa = getELE("txtSearch").value;
    var mangTK = dssv.timkiem(tukhoa.trim());

    hienthiDS(mangTK);
}
// tìm kiếm khi click button search
getELE("btnSearch").onclick = timkiemten;
// onkeypress(Khi người đè phím), onkey down(khi người mới nhân phím), onkeyup(khi người dùng nhấc ngon tay ra khỏi phím)
getELE("txtSearch").onkeyup = timkiemten;