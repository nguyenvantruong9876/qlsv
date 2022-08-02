/**+ lưu trữ nhiều đối tượng sv (mảng sinh viên)
 * + thêm SV( thêm phần tử mới cho mảng)
 * + xoa, sủa ( xóa, cập nhật phần tử mới cho mảng)
 * + tìm kiems sv theo điểu kiện
 */

function DanhSachSinhVien() {
    //thuộc tính
    // mảng các đốitượng sinh viên
    this.mangSV = [];
    //phương thức
    //truyền tham số là đối tưởng sv
    this.themSV = function (sv) {
        this.mangSV.push(sv);

    }
    this.timViTri = function (ma) {
        //giả sử ViTri chưa tìm thấy nên = -1
        var viTri = -1;
        //Duyệt mảng và so sanh mảng để tìm sinh viên trong mảng
        this.mangSV.map(function (sv, index) {
            if(sv.maSV === ma){
                viTri = index;
            }
        });
        //trả kết quả vị trí tìm thấy ra khỏi hàm để sử dụng ở các hàm khác
        return viTri;
    }
    this.xoaSV = function (ma) {
        var ViTri = this.timViTri(ma);
        if(ViTri > -1){
            // tìm thấy
            // splice(vị tri bắt đầu xõa , số lưởng cần xõa tính từ vị triws bắt đầu)
            // splice(1, 3) => xõa các phần tử có index 1 , 2, 3
            this.mangSV.splice(ViTri, 1);
        }
    }
    this.capnhatSV = function (sv) {
        var ViTri = this.timViTri(sv.maSV);
        if(ViTri > -1){
            dssv.mangSV[ViTri] = sv
        }
    }
}
// khai báo phương thúc tìm kiếm
/**
 * Tìm kiếm theo tên
 * các bước:
 * tạo biến mảng chứa kết quả tìm thấy
 * mangTK[sv1, sv2,...] => khai báo mặc định var mangTk=[]
 *  JS: phân biệt chứ Hoa và chứ thường của chuối string
 * =>không nên dùng so  sanh bằng (===)
 * 
 * if tukhoa === sv.tenSv
 * lưu sv tìm thấy vảo mangTk
 * trả kết quả mảng ra khỏi hàm
 * Input: từ khóa tìm kiếm 
 * Output: các sinh viên có từ khóa tìm khóa tìm kiếm
 * 
 */
// Prototype -ES5 => tạo thuộc tính và phương thức mà không cần chỉnh sửa lớp đội tưởng
// c1
DanhSachSinhVien.prototype.timkiem = function (tukhoa) {
    var mangTK = [];
    var tukhoathuong = tukhoa.toLowerCase();
    this.mangSV.map(function (sv) {
        var tenSVThuong = sv.tenSV.toLowerCase();
        var vitriTk = tenSVThuong.indexOf(tukhoathuong);
        if (vitriTk >-1){
            // tìm thấy
            mangTK.push(sv);
        }
    })
    return mangTK;
}
// c2
// DanhSachSinhVien.prototype.timkiem = function (tukhoa) {
//     var mangTK = [];
//     // var tukhoathuong = tukhoa.toLowerCase();
//     this.mangSV.map(function (sv) {
//         // var tenSVThuong = sv.tenSV.toLowerCase();
//         // var vitriTk = tenSVThuong.indexOf(tukhoathuong);
//         var vitriTk = sv.tenSV.toLowerCase().indexOf(tukhoa.toLowerCase());
//         if (vitriTk >-1){
//             // tìm thấy
//             mangTK.push(sv);
//         }
//     })
//     return mangTK;
// }
