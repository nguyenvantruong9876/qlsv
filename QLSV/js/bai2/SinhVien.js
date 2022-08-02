/**
 * khai báo lớp đối tượng SinhVien
 * + khai báo cac thuộc tính, phương pháp chung của các đối tượng sinh viên
 */
function SinhVien(maSV, tenSV, emailSV, passwordSV, dateSV, khoahocSV, toan, ly, hoa) {
    this.maSV = maSV;
    this.tenSV = tenSV;
    this.emailSV = emailSV;
    this.passwordSV = passwordSV;
    this.dateSV = dateSV;
    this.khoahocSV = khoahocSV;
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
    this.dtb = 0;
    // phương thức
    this.tinhDTB = function () {
        this.dtb =(this.toan + this.ly + this.hoa)/3;
    }
}