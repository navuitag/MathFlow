import { readFile, writeFile } from "node:fs/promises";

const files = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const SOURCE = "Bám sát SGK Toán 1 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.";

const grade1 = [
  ["g1_num_0_5", "Bài 1. Các số 0, 1, 2, 3, 4, 5", "Các số từ 0 đến 10", "Nhận biết, đọc, viết và đếm các số từ 0 đến 5.", "numberLine"],
  ["g1_num_6_10", "Bài 2. Các số 6, 7, 8, 9, 10", "Các số từ 0 đến 10", "Nhận biết, đọc, viết và đếm các số từ 6 đến 10.", "numberLine"],
  ["g1_more_less", "Bài 3. Nhiều hơn, ít hơn, bằng nhau", "Các số từ 0 đến 10", "So sánh số lượng đồ vật: nhiều hơn, ít hơn, bằng nhau.", "concept"],
  ["g1_compare", "Bài 4. So sánh số", "Các số từ 0 đến 10", "So sánh hai số trong phạm vi 10 bằng dấu >, <, =.", "numberLine"],
  ["g1_how_many", "Bài 5. Mấy và mấy", "Các số từ 0 đến 10", "Tách một số lượng thành hai phần (mấy và mấy).", "concept"],
  ["g1_practice_ch1", "Bài 6. Luyện tập chung", "Các số từ 0 đến 10", "Củng cố đếm, so sánh và tách số trong phạm vi 10.", "numberLine"],
  ["g1_shapes", "Bài 7. Hình vuông, hình tròn, hình tam giác, hình chữ nhật", "Làm quen với một số hình phẳng", "Nhận biết hình vuông, tròn, tam giác, chữ nhật.", "geometry"],
  ["g1_puzzle", "Bài 8. Thực hành lắp ghép, xếp hình", "Làm quen với một số hình phẳng", "Lắp ghép và xếp các hình phẳng cơ bản.", "geometry"],
  ["g1_practice_ch2", "Bài 9. Luyện tập chung", "Làm quen với một số hình phẳng", "Củng cố nhận biết và xếp hình phẳng.", "geometry"],
  ["g1_add_10", "Bài 10. Phép cộng trong phạm vi 10", "Phép cộng, phép trừ trong phạm vi 10", "Thực hiện phép cộng hai số có tổng không quá 10.", "arithmetic"],
  ["g1_sub_10", "Bài 11. Phép trừ trong phạm vi 10", "Phép cộng, phép trừ trong phạm vi 10", "Thực hiện phép trừ trong phạm vi 10.", "arithmetic"],
  ["g1_tables_10", "Bài 12. Bảng cộng, bảng trừ trong phạm vi 10", "Phép cộng, phép trừ trong phạm vi 10", "Thuộc bảng cộng, trừ và liên hệ giữa chúng.", "arithmetic"],
  ["g1_practice_ch3", "Bài 13. Luyện tập chung", "Phép cộng, phép trừ trong phạm vi 10", "Củng cố cộng, trừ trong phạm vi 10.", "arithmetic"],
  ["g1_solids", "Bài 14. Khối lập phương, khối hộp chữ nhật", "Làm quen với một số hình khối", "Nhận biết khối lập phương và khối hộp chữ nhật.", "solid"],
  ["g1_position", "Bài 15. Vị trí, định hướng trong không gian", "Làm quen với một số hình khối", "Mô tả vị trí: trên, dưới, trái, phải, trước, sau.", "concept"],
  ["g1_practice_ch4", "Bài 16. Luyện tập chung", "Làm quen với một số hình khối", "Củng cố hình khối và vị trí trong không gian.", "solid"],
  ["g1_review_num10", "Bài 17. Ôn tập các số trong phạm vi 10", "Ôn tập học kì 1", "Ôn tập đọc, viết, so sánh số trong phạm vi 10.", "numberLine"],
  ["g1_review_ops10", "Bài 18. Ôn tập phép cộng, phép trừ trong phạm vi 10", "Ôn tập học kì 1", "Ôn tập cộng, trừ trong phạm vi 10.", "arithmetic"],
  ["g1_review_geo", "Bài 19. Ôn tập hình học", "Ôn tập học kì 1", "Ôn tập hình phẳng, hình khối và vị trí.", "geometry"],
  ["g1_review_hk1", "Bài 20. Ôn tập chung", "Ôn tập học kì 1", "Ôn tập tổng hợp học kì 1.", "concept"],
  ["g1_two_digit", "Bài 21. Số có hai chữ số", "Các số đến 100", "Nhận biết số có hai chữ số: chục và đơn vị.", "place"],
  ["g1_compare_2d", "Bài 22. So sánh số có hai chữ số", "Các số đến 100", "So sánh hai số có hai chữ số.", "numberLine"],
  ["g1_table_100", "Bài 23. Bảng các số từ 1 đến 100", "Các số đến 100", "Đọc, viết và tìm số trên bảng số từ 1 đến 100.", "place"],
  ["g1_practice_ch6", "Bài 24. Luyện tập chung", "Các số đến 100", "Củng cố số có hai chữ số và bảng số.", "place"],
  ["g1_longer", "Bài 25. Dài hơn, ngắn hơn", "Độ dài và đo độ dài", "So sánh độ dài: dài hơn, ngắn hơn, bằng nhau.", "estimate"],
  ["g1_length_unit", "Bài 26. Đơn vị đo độ dài", "Độ dài và đo độ dài", "Làm quen đơn vị xăng-ti-mét (cm).", "estimate"],
  ["g1_measure_exp", "Bài 27. Thực hành ước lượng và đo độ dài", "Độ dài và đo độ dài", "Ước lượng và đo độ dài bằng thước.", "estimate"],
  ["g1_practice_ch7", "Bài 28. Luyện tập chung", "Độ dài và đo độ dài", "Củng cố so sánh và đo độ dài.", "estimate"],
  ["g1_add_2d_1d", "Bài 29. Phép cộng có hai chữ số với số có một chữ số", "Phép cộng, phép trừ (không nhớ) trong phạm vi 100", "Cộng số có hai chữ số với số có một chữ số (không nhớ).", "arithmetic"],
  ["g1_add_2d_2d", "Bài 30. Phép cộng có hai chữ số với số có hai chữ số", "Phép cộng, phép trừ (không nhớ) trong phạm vi 100", "Cộng hai số có hai chữ số (không nhớ).", "arithmetic"],
  ["g1_sub_2d_1d", "Bài 31. Phép trừ số có hai chữ số cho số có một chữ số", "Phép cộng, phép trừ (không nhớ) trong phạm vi 100", "Trừ số có hai chữ số cho số có một chữ số (không nhớ).", "arithmetic"],
  ["g1_sub_2d_2d", "Bài 32. Phép trừ số có hai chữ số cho số có hai chữ số", "Phép cộng, phép trừ (không nhớ) trong phạm vi 100", "Trừ hai số có hai chữ số (không nhớ).", "arithmetic"],
  ["g1_practice_ch8", "Bài 33. Luyện tập chung", "Phép cộng, phép trừ (không nhớ) trong phạm vi 100", "Củng cố cộng, trừ không nhớ trong phạm vi 100.", "arithmetic"],
  ["g1_clock", "Bài 34. Xem giờ đúng trên đồng hồ", "Thời gian. Giờ và lịch", "Đọc giờ đúng trên mặt đồng hồ.", "concept"],
  ["g1_weekdays", "Bài 35. Ngày trong tuần", "Thời gian. Giờ và lịch", "Nhận biết các ngày trong tuần và thứ tự.", "concept"],
  ["g1_calendar", "Bài 36. Thực hành xem lịch và giờ", "Thời gian. Giờ và lịch", "Thực hành xem lịch và đồng hồ.", "concept"],
  ["g1_practice_ch9", "Bài 37. Luyện tập chung", "Thời gian. Giờ và lịch", "Củng cố giờ, ngày và lịch.", "concept"],
  ["g1_review_10", "Bài 38. Ôn tập các số và phép tính trong phạm vi 10", "Ôn tập cuối năm", "Ôn tập số và phép tính trong phạm vi 10.", "arithmetic"],
  ["g1_review_100", "Bài 39. Ôn tập các số và phép tính trong phạm vi 100", "Ôn tập cuối năm", "Ôn tập số và phép tính trong phạm vi 100.", "arithmetic"],
  ["g1_review_geo_measure", "Bài 40. Ôn tập hình học và đo lường", "Ôn tập cuối năm", "Ôn tập hình học, đo độ dài và thời gian.", "geometry"],
  ["g1_review_final", "Bài 41. Ôn tập chung", "Ôn tập cuối năm", "Ôn tập tổng hợp cuối năm.", "concept"]
];

const chapters = [...new Set(grade1.map((lesson) => lesson[2]))];

const core = {
  g1_num_0_5: ["Số 0 đến 5", "Mỗi số ghi số lượng đồ vật.", "3 quả táo viết số 3.", "Đếm từng đồ vật một, không bỏ sót."],
  g1_num_6_10: ["Số 6 đến 10", "Tiếp tục đếm sau số 5.", "Sau 9 là số 10.", "10 gồm 1 chục."],
  g1_more_less: ["So sánh số lượng", "Nhiều hơn: bên này nhiều đồ hơn; ít hơn: bên kia ít hơn.", "5 bông hoa nhiều hơn 3 bông hoa.", "Đếm từng bên rồi so sánh."],
  g1_compare: ["Dấu so sánh", "> lớn hơn, < nhỏ hơn, = bằng nhau.", "7 > 4 vì 7 đứng sau 4 trên trục số.", "Số lớn hơn nằm bên phải trên trục số."],
  g1_how_many: ["Tách số lượng", "Mấy và mấy: chia nhóm thành hai phần.", "7 = 3 và 4 (3 + 4 = 7).", "Hai phần ghép lại bằng tổng."],
  g1_practice_ch1: ["Củng cố số 0–10", "Kết hợp đếm, so sánh, tách số.", "8 > 5; 8 = 5 và 3.", "Đọc kỹ yêu cầu từng câu."],
  g1_shapes: ["Bốn hình cơ bản", "Vuông: 4 cạnh bằng nhau; tròn: không góc; tam giác: 3 cạnh; chữ nhật: 4 góc vuông.", "Cửa sổ thường là hình chữ nhật.", "Đếm cạnh và góc để nhận dạng."],
  g1_puzzle: ["Xếp hình", "Ghép các mảnh hình tạo hình mới.", "2 tam giác vuông ghép thành hình vuông.", "Xoay thử mảnh cho khớp cạnh."],
  g1_practice_ch2: ["Nhận dạng hình", "Gọi đúng tên hình phẳng.", "Biển báo giao thông hay có hình tròn, tam giác.", "Quan sát số cạnh và góc."],
  g1_add_10: ["Phép cộng", "Cộng là gộp hai nhóm lại.", "3 + 2 = 5 (3 quả cộng 2 quả).", "Đếm tất cả sau khi gộp."],
  g1_sub_10: ["Phép trừ", "Trừ là bớt đi một phần.", "7 - 3 = 4 (7 quả bớt 3 quả).", "Bắt đầu từ số lớn, bớt số nhỏ."],
  g1_tables_10: ["Bảng cộng trừ", "Cộng và trừ là phép ngược nhau.", "6 + 4 = 10 nên 10 - 4 = 6.", "Thuộc các cặp số tạo thành 10."],
  g1_practice_ch3: ["Luyện cộng trừ", "Chọn phép tính theo lời bài.", "Có 5 bạn, thêm 2 bạn: 5 + 2 = 7.", "Đọc từ khóa: thêm, bớt, tổng cộng."],
  g1_solids: ["Hình khối", "Khối lập phương: 6 mặt vuông; hộp chữ nhật: 6 mặt chữ nhật.", "Hộp giấy thường là khối hộp chữ nhật.", "Hình khối có thể cầm, xếp chồng."],
  g1_position: ["Vị trí", "Trên/dưới, trái/phải, trước/sau so với vật mốc.", "Quả bóng ở trên bàn.", "Chọn vật mốc rõ ràng trước khi mô tả."],
  g1_practice_ch4: ["Hình khối và vị trí", "Kết hợp nhận dạng khối và mô tả vị trí.", "Khối lập phương nằm bên trái hộp chữ nhật.", "Quan sát từ phía em đang nhìn."],
  g1_review_num10: ["Ôn số 0–10", "Đọc, viết, so sánh số trong phạm vi 10.", "9 > 6; số liền sau 9 là 10.", "Số liền trước bé hơn 1 đơn vị."],
  g1_review_ops10: ["Ôn cộng trừ", "Tính nhanh trong phạm vi 10.", "8 + 2 = 10; 10 - 6 = 4.", "Kiểm tra bằng phép tính ngược."],
  g1_review_geo: ["Ôn hình học", "Hình phẳng, khối và vị trí.", "Tam giác có 3 cạnh.", "Phân biệt hình phẳng (vẽ) và khối (3D)."],
  g1_review_hk1: ["Tổng hợp HK1", "Số, phép tính, hình học cơ bản.", "5 + 3 = 8; hình vuông có 4 cạnh bằng nhau.", "Ôn từng chủ đề đã học."],
  g1_two_digit: ["Chục và đơn vị", "Số 35: 3 chục và 5 đơn vị.", "47 = 40 + 7.", "Chữ số bên trái là chục, bên phải là đơn vị."],
  g1_compare_2d: ["So sánh số 2 chữ số", "So hàng chục trước, rồi hàng đơn vị.", "52 > 48 vì 5 chục > 4 chục.", "Chục bằng nhau thì so đơn vị."],
  g1_table_100: ["Bảng số 1–100", "Các số cùng hàng chục nằm trên một hàng.", "Số 67 nằm hàng 60, cột 7.", "Đọc theo hàng chục rồi đơn vị."],
  g1_practice_ch6: ["Củng cố số đến 100", "Đọc, viết, so sánh số hai chữ số.", "73 > 69; số liền sau 99 là 100.", "100 có 1 chục và 0 đơn vị ở hàng chục."],
  g1_longer: ["So sánh độ dài", "Dài hơn, ngắn hơn khi đặt cạnh nhau.", "Thước 20 cm dài hơn bút 15 cm.", "Hai vật phải đặt cùng điểm bắt đầu."],
  g1_length_unit: ["Xăng-ti-mét", "cm là đơn vị đo độ dài nhỏ.", "Bút chì dài khoảng 15 cm.", "Viết tắt xăng-ti-mét là cm."],
  g1_measure_exp: ["Đo bằng thước", "Đặt thước sát vật, đọc vạch 0 và vạch cuối.", "Cạnh bàn dài 80 cm.", "Mắt nhìn thẳng vạch chia."],
  g1_practice_ch7: ["Củng cố đo dài", "So sánh và đo độ dài.", "45 cm ngắn hơn 50 cm.", "Ghi đơn vị cm sau số đo."],
  g1_add_2d_1d: ["Cộng không nhớ", "Cộng hàng đơn vị trước, rồi hàng chục.", "23 + 4 = 27.", "Không nhớ sang hàng chục."],
  g1_add_2d_2d: ["Cộng hai số 2 chữ số", "Cộng chục với chục, đơn vị với đơn vị.", "34 + 25 = 59.", "Thẳng hàng chục và đơn vị."],
  g1_sub_2d_1d: ["Trừ không nhớ", "Trừ đơn vị trước, rồi chục.", "47 - 3 = 44.", "Số bị trừ phải lớn hơn số trừ."],
  g1_sub_2d_2d: ["Trừ hai số 2 chữ số", "Trừ đơn vị với đơn vị, chục với chục.", "68 - 25 = 43.", "Đặt tính thẳng hàng."],
  g1_practice_ch8: ["Luyện cộng trừ 100", "Cộng trừ không nhớ trong phạm vi 100.", "52 + 16 = 68; 75 - 23 = 52.", "Kiểm tra bằng phép ngược."],
  g1_clock: ["Giờ đúng", "Kim ngắn chỉ giờ, kim dài chỉ phút.", "8 giờ: kim ngắn ở 8, kim dài ở 12.", "Giờ đúng khi kim dài chỉ số 12."],
  g1_weekdays: ["Thứ trong tuần", "Thứ Hai, Ba, Tư, Năm, Sáu, Bảy, Chủ nhật.", "Sau Thứ Sáu là Thứ Bảy.", "Một tuần có 7 ngày."],
  g1_calendar: ["Lịch và giờ", "Lịch cho biết ngày, tháng; đồng hồ cho biết giờ.", "Ngày 15 tháng 3 trên lịch.", "Đọc tên tháng và số ngày."],
  g1_practice_ch9: ["Thời gian", "Kết hợp giờ, ngày, lịch.", "Hôm nay Thứ Ba, 7 giờ sáng.", "Buổi sáng thường trước 12 giờ trưa."],
  g1_review_10: ["Ôn phạm vi 10", "Số và phép tính trong phạm vi 10.", "9 - 5 = 4.", "Thuộc bảng cộng trừ giúp tính nhanh."],
  g1_review_100: ["Ôn phạm vi 100", "Số hai chữ số và cộng trừ không nhớ.", "61 + 27 = 88.", "So chục trước khi so sánh."],
  g1_review_geo_measure: ["Ôn hình và đo", "Hình phẳng, khối, độ dài, thời gian.", "Hình tròn không có góc; thước 30 cm.", "Chọn đúng kiến thức theo câu hỏi."],
  g1_review_final: ["Ôn cuối năm", "Tổng hợp toàn bộ chương trình lớp 1.", "6 + 4 = 10; 56 > 52; 3 giờ chiều.", "Đọc kỹ đề trước khi trả lời."]
};

const questions = {
  g1_num_0_5: [["multiple_choice", "Số nào đứng liền sau số 4?", ["5", "3", "6", "2"], "5", "Đếm: 0,1,2,3,4,5."], ["input", "Có 3 con chim. Viết số.", "3", "Đếm số con chim."]],
  g1_num_6_10: [["input", "Số liền sau 9 là số nào?", "10", "9 rồi đến 10."], ["multiple_choice", "Số nào nhỏ nhất?", ["6", "9", "8", "10"], "6", "6 đứng trước các số kia."]],
  g1_more_less: [["multiple_choice", "5 quả cam ___ 3 quả cam (nhiều hơn / ít hơn / bằng nhau)?", ["nhiều hơn", "ít hơn", "bằng nhau"], "nhiều hơn", "5 > 3."], ["input", "4 bông hoa và 4 bông hoa: bằng nhau hay không? (gõ: bằng nhau hoặc không)", "bằng nhau", "Hai bên cùng 4."]],
  g1_compare: [["input", "Điền dấu >, < hoặc =: 6 ___ 8", "<", "6 nhỏ hơn 8."], ["multiple_choice", "7 ___ 7", [">", "<", "="], "=", "Hai số giống nhau."]],
  g1_how_many: [["input", "7 = 3 và mấy?", "4", "3 + 4 = 7."], ["multiple_choice", "10 = 6 và ?", ["4", "3", "5", "16"], "4", "6 + 4 = 10."]],
  g1_practice_ch1: [["input", "Số liền trước 8 là?", "7", "8 - 1 = 7."], ["multiple_choice", "Số lớn nhất trong 2, 9, 5, 7?", ["9", "7", "5", "2"], "9", "9 lớn nhất."]],
  g1_shapes: [["multiple_choice", "Hình nào có 3 cạnh?", ["Tam giác", "Vuông", "Tròn", "Chữ nhật"], "Tam giác", "Tam giác có 3 cạnh."], ["input", "Hình tròn có mấy góc?", "0", "Hình tròn không có góc."]],
  g1_puzzle: [["multiple_choice", "Ghép 2 hình tam giác vuông có thể tạo?", ["Hình vuông", "Hình tròn", "Hình thang", "Đường thẳng"], "Hình vuông", "Hai tam giác vuông ghép vuông."], ["input", "Hình vuông có mấy cạnh?", "4", "4 cạnh bằng nhau."]],
  g1_practice_ch2: [["input", "Hình chữ nhật có mấy góc vuông?", "4", "4 góc đều vuông."], ["multiple_choice", "Biển báo cấm thường là hình gì?", ["Tròn", "Vuông", "Tam giác", "Thoi"], "Tròn", "Biển tròn đỏ hay gặp."]],
  g1_add_10: [["input", "Tính 4 + 3.", "7", "4 + 3 = 7."], ["multiple_choice", "5 + 5 = ?", ["10", "9", "11", "55"], "10", "5 + 5 = 10."]],
  g1_sub_10: [["input", "Tính 9 - 4.", "5", "9 - 4 = 5."], ["multiple_choice", "10 - 3 = ?", ["7", "13", "8", "6"], "7", "10 - 3 = 7."]],
  g1_tables_10: [["input", "6 + ? = 10", "4", "6 + 4 = 10."], ["multiple_choice", "10 - 7 = ?", ["3", "17", "4", "2"], "3", "10 - 7 = 3."]],
  g1_practice_ch3: [["input", "Có 6 quả, thêm 2 quả. Tổng cộng?", "8", "6 + 2 = 8."], ["multiple_choice", "8 - 5 = ?", ["3", "13", "2", "4"], "3", "8 - 5 = 3."]],
  g1_solids: [["multiple_choice", "Hộp sữa hình dạng gì?", ["Khối hộp chữ nhật", "Khối lập phương", "Hình tròn", "Tam giác"], "Khối hộp chữ nhật", "Hộp sữa là hình hộp."], ["input", "Khối lập phương có mấy mặt?", "6", "6 mặt vuông."]],
  g1_position: [["multiple_choice", "Con mèo ở ___ con chó (chó ở dưới mèo).", ["trên", "dưới", "trong", "ngoài"], "trên", "Mèo cao hơn chó."], ["input", "Bên trái đối diện với bên gì?", "phải", "Trái - phải đối diện."]],
  g1_practice_ch4: [["input", "Xúc xắc thường là khối gì?", "lập phương", "Xúc xắc là lập phương."], ["multiple_choice", "Quyển sách nằm ___ cái bàn.", ["trên", "dưới", "trong", "sau"], "trên", "Sách đặt trên bàn."]],
  g1_review_num10: [["input", "Số liền sau 5?", "6", "5 + 1 = 6."], ["multiple_choice", "3 ___ 8", ["<", ">", "="], "<", "3 nhỏ hơn 8."]],
  g1_review_ops10: [["input", "7 + 2 = ?", "9", "7 + 2 = 9."], ["multiple_choice", "10 - 4 = ?", ["6", "14", "5", "4"], "6", "10 - 4 = 6."]],
  g1_review_geo: [["multiple_choice", "Hình nào lăn được dễ nhất?", ["Tròn", "Vuông", "Tam giác", "Chữ nhật"], "Tròn", "Hình tròn lăn tròn."], ["input", "Hình vuông có mấy cạnh bằng nhau?", "4", "4 cạnh đều bằng nhau."]],
  g1_review_hk1: [["input", "9 - 6 = ?", "3", "9 - 6 = 3."], ["multiple_choice", "Số 10 gồm mấy chục?", ["1", "10", "0", "2"], "1", "10 = 1 chục."]],
  g1_two_digit: [["multiple_choice", "Số 45 có mấy chục?", ["4", "5", "45", "9"], "4", "4 chục và 5 đơn vị."], ["input", "Viết số: 7 chục 2 đơn vị.", "72", "7 chục 2 đơn vị = 72."]],
  g1_compare_2d: [["input", "63 ___ 58 (điền >, < hoặc =)", ">", "6 chục > 5 chục."], ["multiple_choice", "Số nào lớn nhất: 41, 38, 49?", ["49", "41", "38", "48"], "49", "4 chục, 9 đơn vị lớn nhất."]],
  g1_table_100: [["input", "Số liền sau 89?", "90", "89 + 1 = 90."], ["multiple_choice", "Số 56 nằm giữa 55 và ?", ["57", "56", "54", "58"], "57", "55, 56, 57 liên tiếp."]],
  g1_practice_ch6: [["input", "Viết số: năm mươi ba.", "53", "5 chục 3 đơn vị."], ["multiple_choice", "82 ___ 28", [">", "<", "="], ">", "8 chục > 2 chục."]],
  g1_longer: [["multiple_choice", "Thước 30 cm so với bút 12 cm?", ["Dài hơn", "Ngắn hơn", "Bằng nhau"], "Dài hơn", "30 > 12."], ["input", "15 cm so với 20 cm: ngắn hơn hay dài hơn? (gõ: ngắn hơn hoặc dài hơn)", "ngắn hơn", "15 < 20."]],
  g1_length_unit: [["input", "Viết tắt xăng-ti-mét là gì?", "cm", "centimetre = cm."], ["multiple_choice", "Đo độ dài bút chì nên dùng?", ["cm", "kg", "lít", "giờ"], "cm", "cm đo chiều dài."]],
  g1_measure_exp: [["input", "Thước kẻ thường dài 20 cm hay 20 m?", "cm", "Thước kẻ dùng cm."], ["multiple_choice", "Đo chiều dài nên đặt vạch 0 ở đâu?", ["Đầu vật", "Giữa vật", "Cuối vật", "Không cần"], "Đầu vật", "Vạch 0 trùng đầu vật."]],
  g1_practice_ch7: [["input", "45 cm + 5 cm = ? cm", "50", "45 + 5 = 50."], ["multiple_choice", "Cái gì dài hơn: 1 m hay 50 cm?", ["1 m", "50 cm", "Bằng nhau"], "1 m", "1 m = 100 cm."]],
  g1_add_2d_1d: [["input", "32 + 5 = ?", "37", "2 + 5 = 7, 3 chục + 7 = 37."], ["multiple_choice", "41 + 6 = ?", ["47", "46", "48", "57"], "47", "41 + 6 = 47."]],
  g1_add_2d_2d: [["input", "23 + 15 = ?", "38", "3 + 5 = 8, 2 + 1 = 3."], ["multiple_choice", "52 + 24 = ?", ["76", "75", "86", "66"], "76", "2+4=6, 5+2=7."]],
  g1_sub_2d_1d: [["input", "58 - 4 = ?", "54", "8 - 4 = 4, 5 chục."], ["multiple_choice", "76 - 3 = ?", ["73", "79", "74", "83"], "73", "6 - 3 = 3."]],
  g1_sub_2d_2d: [["input", "67 - 25 = ?", "42", "7-5=2, 6-2=4."], ["multiple_choice", "89 - 36 = ?", ["53", "52", "63", "43"], "53", "9-6=3, 8-3=5."]],
  g1_practice_ch8: [["input", "34 + 22 = ?", "56", "4+2=6, 3+2=5."], ["multiple_choice", "78 - 35 = ?", ["43", "42", "53", "33"], "43", "8-5=3, 7-3=4."]],
  g1_clock: [["multiple_choice", "Kim dài chỉ số 12, kim ngắn chỉ 3. Mấy giờ?", ["3 giờ", "12 giờ", "9 giờ", "6 giờ"], "3 giờ", "Kim ngắn chỉ giờ."], ["input", "7 giờ đúng: kim dài chỉ số mấy?", "12", "Giờ đúng kim dài ở 12."]],
  g1_weekdays: [["input", "Sau Thứ Tư là thứ gì?", "Năm", "Thứ Tư rồi Thứ Năm."], ["multiple_choice", "Một tuần có mấy ngày?", ["7", "5", "6", "10"], "7", "7 ngày trong tuần."]],
  g1_calendar: [["multiple_choice", "Lịch dùng để xem gì?", ["Ngày tháng", "Cân nặng", "Nhiệt độ", "Độ dài"], "Ngày tháng", "Lịch ghi ngày tháng."], ["input", "Thứ Bảy rồi đến ngày gì?", "Chủ nhật", "Cuối tuần."]],
  g1_practice_ch9: [["input", "Kim ngắn 9, kim dài 12: mấy giờ?", "9", "9 giờ đúng."], ["multiple_choice", "Ngày đầu tuần đi học thường là?", ["Thứ Hai", "Thứ Bảy", "Chủ nhật", "Thứ Sáu"], "Thứ Hai", "Thứ Hai đầu tuần."]],
  g1_review_10: [["input", "5 + 4 = ?", "9", "5 + 4 = 9."], ["multiple_choice", "10 - 8 = ?", ["2", "18", "3", "1"], "2", "10 - 8 = 2."]],
  g1_review_100: [["input", "63 + 25 = ?", "88", "3+5=8, 6+2=8."], ["multiple_choice", "91 - 40 = ?", ["51", "61", "50", "41"], "51", "1-0=1, 9-4=5."]],
  g1_review_geo_measure: [["multiple_choice", "Hình nào có 4 góc vuông?", ["Chữ nhật", "Tròn", "Tam giác", "None"], "Chữ nhật", "Chữ nhật 4 góc vuông."], ["input", "Đo chiều dài dùng đơn vị gì?", "cm", "cm cho vật nhỏ."]],
  g1_review_final: [["input", "8 + 2 = ?", "10", "8 + 2 = 10."], ["multiple_choice", "74 ___ 47", [">", "<", "="], ">", "7 chục > 4 chục."]]
};

const errorPatterns = [
  ["g1_compare", ">", "compare_direction_error", "Nhầm dấu so sánh", "6 < 8 vì 6 nhỏ hơn 8, không phải 6 > 8.", "Số lớn hơn đứng bên phải trên trục số."],
  ["g1_add_10", "11", "add_overflow_error", "Vượt phạm vi 10", "4 + 3 = 7, không phải 11.", "Kiểm tra tổng không quá 10."],
  ["g1_sub_10", "11", "sub_reverse_error", "Trừ ngược", "7 - 3 = 4, không phải 3 - 7.", "Lấy số lớn trừ số nhỏ."],
  ["g1_shapes", "tam giác", "shape_confusion", "Nhầm hình", "Hình tròn không có cạnh thẳng.", "Đếm số cạnh và góc."],
  ["g1_two_digit", "75", "place_value_error", "Nhầm chục và đơn vị", "57 không phải 75; chữ số 5 là chục.", "Chữ số trái là chục, phải là đơn vị."],
  ["g1_compare_2d", "38", "two_digit_compare_error", "So đơn vị trước chục", "52 > 38 vì so hàng chục trước (5 > 3).", "So sánh chục trước, đơn vị sau."],
  ["g1_add_2d_2d", "68", "add_place_error", "Cộng sai hàng", "34 + 25 = 59, không phải 68.", "Cộng chục với chục, đơn vị với đơn vị."],
  ["g1_sub_2d_2d", "52", "sub_place_error", "Trừ sai hàng", "67 - 25 = 42, không phải 52.", "Trừ đơn vị trước, chục sau."],
  ["g1_length_unit", "m", "length_unit_error", "Nhầm đơn vị", "Bút chì đo bằng cm, không phải m.", "Vật nhỏ dùng cm."],
  ["g1_clock", "9", "clock_hand_error", "Nhầm kim giờ và phút", "Kim ngắn chỉ giờ, kim dài chỉ phút.", "Giờ đúng: kim dài ở 12."],
  ["g1_how_many", "10", "split_number_error", "Tách số sai", "7 = 3 và 4, không phải 3 và 10.", "Hai phần cộng lại bằng tổng."]
];

function lessonSteps([id, title, chapter, description, visualization]) {
  const [visualTitle, visualContent, example, summary] = core[id];
  return [
    { type: "intro", title: "Mục tiêu vi kỹ năng", content: description },
    {
      type: "visualization",
      title: visualTitle,
      content: visualContent,
      visualization,
      numerator: 2,
      denominator: 3
    },
    { type: "example", title: "Ví dụ tự tạo", content: example },
    { type: "summary", title: "Ghi nhớ nhanh", content: summary }
  ];
}

function makeSkill(item, index) {
  const [id, title, chapter, description, visualization] = item;
  return {
    id,
    title,
    grade: 1,
    book: index < 20 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo: index + 1,
    domain: chapter,
    level: index < 13 ? 1 : index < 28 ? 2 : 3,
    prerequisite: index === 0 ? [] : [grade1[index - 1][0]],
    description,
    visualization
  };
}

function makeLesson(item, index) {
  const [id, title, chapter] = item;
  return {
    id,
    title,
    skill: id,
    chapter,
    source: SOURCE,
    xp: 30 + Math.floor(index / 4) * 5,
    steps: lessonSteps(item)
  };
}

function makeQuestions(id) {
  return questions[id].map(([type, question, choicesOrAnswer, answerOrHint, maybeHint], qIndex) => {
    const isChoice = type === "multiple_choice";
    return {
      id: `q_${id}_${qIndex + 1}`,
      skill: id,
      type,
      question,
      ...(isChoice
        ? { choices: choicesOrAnswer, answer: answerOrHint, hint: maybeHint }
        : { answer: choicesOrAnswer, hint: answerOrHint })
    };
  });
}

function stripGrade1(items) {
  return items.filter((item) => {
    if (item.grade === 1) return false;
    const skillId = item.skill || item.id;
    return !(typeof skillId === "string" && skillId.startsWith("g1_"));
  });
}

const existingSkills = stripGrade1(await readJson(files.skills));
const existingLessons = stripGrade1(await readJson(files.lessons));
const existingQuestions = stripGrade1(await readJson(files.questions));
const existingErrors = stripGrade1(await readJson(files.errors));

const nextSkills = grade1.map(makeSkill);
const nextLessons = grade1.map(makeLesson);
const nextQuestions = grade1.flatMap(([id]) => makeQuestions(id));
const nextErrors = errorPatterns.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

await writeFile(files.skills, `${JSON.stringify([...existingSkills, ...nextSkills], null, 2)}\n`);
await writeFile(files.lessons, `${JSON.stringify([...existingLessons, ...nextLessons], null, 2)}\n`);
await writeFile(files.questions, `${JSON.stringify([...existingQuestions, ...nextQuestions], null, 2)}\n`);
await writeFile(files.errors, `${JSON.stringify([...existingErrors, ...nextErrors], null, 2)}\n`);

console.log(`Added ${nextSkills.length} grade 1 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
