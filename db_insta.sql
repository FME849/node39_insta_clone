DROP DATABASE IF EXISTS db_insta;
CREATE DATABASE db_insta;

USE db_insta;

DROP TABLE IF EXISTS nguoi_dung;
CREATE TABLE nguoi_dung(
	nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY, 
	email VARCHAR(100) NOT NULL,
	mat_khau VARCHAR(20) NOT NULL,
	ho_ten VARCHAR(100) NOT NULL,
	tuoi INT,
	anh_dai_dien VARCHAR(255)
);

DROP TABLE IF EXISTS hinh_anh;
CREATE TABLE hinh_anh(
	hinh_id INT AUTO_INCREMENT PRIMARY KEY,
	ten_hinh VARCHAR(100),
	duong_dan VARCHAR(225),
	mo_ta VARCHAR(225),
	nguoi_dung_id INT,
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);

DROP TABLE IF EXISTS binh_luan;
CREATE TABLE binh_luan(
	binh_luan_id INT AUTO_INCREMENT PRIMARY KEY,
	nguoi_dung_id INT,
	hinh_id INT,
	ngay_binh_luan DATE,
	noi_dung VARCHAR(255),
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
	FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

DROP TABLE IF EXISTS luu_anh;
CREATE TABLE luu_anh(
	nguoi_dung_id INT,
	hinh_id INT,
	ngay_luu DATE,
	PRIMARY KEY(nguoi_dung_id, hinh_id),
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
	FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);