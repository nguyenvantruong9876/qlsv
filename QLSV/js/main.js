/**
 * varitable
 * number, strings, boolean, array
 */
// => tạo rất nhiều biến, khó tìm kiếm ,sắp xếp dữ liệu
// var ma = "SV001";
// var ten = "THuong mai";
// var toan = 10;
// var van = 9;

// => khi thêm xõa sửa dữ liệu xử lý trên nhiều mảng dữ liệu
// var ma = ["SV001", "SV002"]
// var ten = ["THuong mai", "Quá trình"]
// var toan = [10, 9]
// var ma = [9, 9]

// cần có kiểu dữ liệu giúp tổ chức lưu dữ liệu của 1 sinh viên rõ rãng
// kiểu dữ liệu giúp tổ chức dánh sách nhiều sinh viên mà chỉ cần dùng 1 biến mảng
// =>đối tưởng (object)

// khai báo đối tưởng
var sv1 = {
    //thông tin liên quan cần lưu trữ của obj
    // thuộc tính ( property)
    id:"SV001", 
    name:"Nguyễn Thị Sinh Viên",
    toan:10,
    van:9,
    // phương thức (method)
    // this : đại diện cho đối tưởng sv2, giúp truy xuất thuộc tính của đối tượng
    //gọi bên trong phương thức của dối tượng

    tinhDTB:function () {
        return (this.toan + this.van)/2;
    }
}
console.log(sv1);
// gọi bên ngoài dối tượng
//đổitượng.tênthuộctính
console.log(sv1.toan);
// gọi phương thú
console.log(sv1.tinhDTB());
// console.table(sv1);

// khi muốn tạo thêm đối tượng sv mới thì phải khai báo lại các thuộc tính + phương thứ => tốn nhiều code khai báo
// =>l ớp đối tướng (Class)
// chưa các thuộc tính + phương thúc chung cho ttaats carc ddooir tượng cùng loại(Sinh VIên) cd class Sinhvien, class Nhanvien, class sanpham

//khai báo ES5 (function)
// pascal Case (Việt hoa chữ cái đầu tiên)
/**
 * Tạo lớp đối tượn Sinh VIên => tạo nhanh các đối tượng 
 * Lấy thông tin từ forrm
 * Lưu vòa thuộc tính của lớp đối tượng để luwu trú(tạo ra sv mới)
 * Hiện thị đém các thông tin ccuar sinh viên theo yêu cầu
 */
function SinhVien(maSV, tenSV, loaiSV, diemToan, diemVan) {
    // this: đại diện cho lớp đối tưởng SinhVien => truy xuất được các thuộc tính (gọi thuộc tính)
    //thuộc tính
    this.id = maSV;
    this.name = tenSV;
    this.loai = loaiSV;
    this.toan = diemToan;
    this.van = diemVan;
    // phương thức
    this.tinhDTB = function () {
        return (this.toan + this.van)/2;
    }
    this.xeploai = function (dtb) {
        if (9 <= dtb && dtb <=10) {
            return "Giỏi"
        } else if(7 <= dtb && dtb <=9){
            return "Khá"
        } else if(0 <= dtb && dtb <=7){
            return  "Trung BÌnh"
        } else{
            return  "Chưa xếp loại"
        }
    }
}
// Sử dụng lớp dổi tượng => tạo thẻ hiện của lớp (íntance)
// var sv3 = new SinhVien("SV003", "Hơi Đen", 10 , 9)
// console.table(sv3)
// console.table(sv3.tinhDTB())

function hienthiSinhVien() {
    var maSV = document.getElementById("txtMaSV").value;
    var tenSV = document.getElementById("txtTenSV").value;
    var loaiSV = document.getElementById("loaiSV").value;
    var diemToan = Number(document.getElementById("txtDiemToan").value);
    var diemVan = Number(document.getElementById("txtDiemVan").value);

    console.log(maSV, tenSV, loaiSV, diemToan, diemVan);
    //tạo thế hiện của lớp 
    var svnew = new SinhVien(maSV, tenSV, loaiSV, diemToan, diemVan);
    console.log(svnew.tinhDTB());

    // var dtb = svnew.tinhDTB();
    // var xepLoaiHL = svnew.xeploai(dtb);
    // console.log(xepLoaiHL);
    //Callback function : 1 hàm nhần giá trị tham số từ 1 hàm khác
    // Đk dùng: 1- hàm truyền là có return
    // 2 - hàm nhận giái trị cần truyền giá trị vào tham số
    var xepLoaiHL = svnew.xeploai(svnew.tinhDTB());
    console.log(xepLoaiHL);
    document.getElementById("spanTenSV").innerHTML = svnew.name;
    document.getElementById("spanMaSV").innerHTML = svnew.id;
    document.getElementById("spanLoaiSV").innerHTML = svnew.loai;
    document.getElementById("spanDTB").innerHTML = svnew.tinhDTB();
    // document.getElementById().innerHTML = xepLoaiHL;
    document.getElementById("spanXepLoai").innerHTML = svnew.xeploai(svnew.tinhDTB());
}
document.querySelector(".container-fluid .btn").onclick = hienthiSinhVien;