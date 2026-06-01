import { readFile, writeFile } from "node:fs/promises";
import { makeKeypointsStepFromCore } from "./lesson-keypoints.mjs";

const files = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const SOURCE = "Bám sát SGK Toán 3 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.";

const grade3 = [
  ["g3_review_1000", "Bài 1. Ôn tập các số đến 1000", "Ôn tập và bổ sung", "Ôn tập đọc, viết, so sánh số trong phạm vi 1000.", "place"],
  ["g3_add_sub_review", "Bài 2. Ôn tập phép cộng, phép trừ trong phạm vi 1000", "Ôn tập và bổ sung", "Ôn tập cộng, trừ số có ba chữ số trong phạm vi 1000.", "arithmetic"],
  ["g3_add_sub_parts", "Bài 3. Tìm thành phần trong phép cộng, phép trừ", "Ôn tập và bổ sung", "Tìm số hạng, tổng, số bị trừ, số trừ, hiệu chưa biết.", "concept"],
  ["g3_table_2_5", "Bài 4. Ôn tập bảng nhân 2; 5, Bảng chia 2; 5", "Ôn tập và bổ sung", "Thuộc bảng nhân, chia 2 và 5.", "arithmetic"],
  ["g3_table_3", "Bài 5. Bảng nhân 3, bảng chia 3", "Ôn tập và bổ sung", "Thuộc bảng nhân 3 và bảng chia 3.", "arithmetic"],
  ["g3_table_4", "Bài 6. Bảng nhân 4, bảng chia 4", "Ôn tập và bổ sung", "Thuộc bảng nhân 4 và bảng chia 4.", "arithmetic"],
  ["g3_review_geo_measure", "Bài 7. Ôn tập hình học và đo lường", "Ôn tập và bổ sung", "Ôn tập hình phẳng, khối và đo lường cơ bản.", "geometry"],
  ["g3_practice_ch1", "Bài 8. Luyện tập chung", "Ôn tập và bổ sung", "Củng cố số đến 1000, phép tính và bảng nhân, chia.", "numberLine"],
  ["g3_table_6", "Bài 9. Bảng nhân 6, bảng chia 6", "Bảng nhân, bảng chia", "Thuộc bảng nhân 6 và bảng chia 6.", "arithmetic"],
  ["g3_table_7", "Bài 10. Bảng nhân 7, bảng chia 7", "Bảng nhân, bảng chia", "Thuộc bảng nhân 7 và bảng chia 7.", "arithmetic"],
  ["g3_table_8", "Bài 11. Bảng nhân 8, bảng chia 8", "Bảng nhân, bảng chia", "Thuộc bảng nhân 8 và bảng chia 8.", "arithmetic"],
  ["g3_table_9", "Bài 12. Bảng nhân 9, bảng chia 9", "Bảng nhân, bảng chia", "Thuộc bảng nhân 9 và bảng chia 9.", "arithmetic"],
  ["g3_mul_div_parts", "Bài 13. Tìm thành phần trong phép nhân, phép chia", "Bảng nhân, bảng chia", "Tìm thừa số, tích, số bị chia, số chia, thương chưa biết.", "concept"],
  ["g3_fraction_part", "Bài 14. Một phần mấy", "Bảng nhân, bảng chia", "Nhận biết một phần mấy của một hình hoặc một số.", "fractionBar"],
  ["g3_practice_ch2", "Bài 15. Luyện tập chung", "Bảng nhân, bảng chia", "Củng cố bảng nhân, chia và một phần mấy.", "fractionCompare"],
  ["g3_midpoint", "Bài 16. Điểm ở giữa, trung điểm của đoạn thẳng", "Làm quen với hình phẳng, hình khối", "Nhận biết điểm ở giữa và trung điểm đoạn thẳng.", "geometry"],
  ["g3_circle", "Bài 17. Hình tròn. Tâm, bán kính, đường kính của hình tròn", "Làm quen với hình phẳng, hình khối", "Nhận biết tâm, bán kính, đường kính hình tròn.", "circle"],
  ["g3_angle", "Bài 18. Góc, góc vuông, góc không vuông", "Làm quen với hình phẳng, hình khối", "Nhận biết góc vuông và góc không vuông.", "angle"],
  ["g3_plane_shapes", "Bài 19. Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông", "Làm quen với hình phẳng, hình khối", "Phân biệt tam giác, tứ giác, hình chữ nhật, hình vuông.", "triangle"],
  ["g3_draw_practice", "Bài 20. Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí", "Làm quen với hình phẳng, hình khối", "Thực hành vẽ hình phẳng và trang trí.", "geometry"],
  ["g3_cube_box", "Bài 21. Khối lập phương, khối hộp hình chữ nhật", "Làm quen với hình phẳng, hình khối", "Nhận biết khối lập phương và khối hộp chữ nhật.", "solid"],
  ["g3_practice_ch3", "Bài 22. Luyện tập chung", "Làm quen với hình phẳng, hình khối", "Củng cố hình phẳng, hình tròn, góc và hình khối.", "solid"],
  ["g3_mul_2d_1d", "Bài 23. Nhân số có hai chữ số với số có một chữ số", "Phép nhân, phép chia trong phạm vi 100", "Nhân số có hai chữ số với số có một chữ số.", "arithmetic"],
  ["g3_multiply_times", "Bài 24. Gấp một số lên một số lần", "Phép nhân, phép chia trong phạm vi 100", "Gấp một số lên nhiều lần bằng phép nhân.", "ratio"],
  ["g3_division_remainder", "Bài 25. Phép chia hết, phép chia có dư", "Phép nhân, phép chia trong phạm vi 100", "Phân biệt chia hết và chia có dư.", "arithmetic"],
  ["g3_div_2d_1d", "Bài 26. Chia số có hai chữ số cho số có một chữ số", "Phép nhân, phép chia trong phạm vi 100", "Chia số có hai chữ số cho số có một chữ số.", "arithmetic"],
  ["g3_reduce_times", "Bài 27. Giảm một số đi một số lần", "Phép nhân, phép chia trong phạm vi 100", "Giảm một số đi nhiều lần bằng phép chia.", "ratio"],
  ["g3_two_step", "Bài 28. Bài toán giải bằng hai bước tính", "Phép nhân, phép chia trong phạm vi 100", "Giải bài toán cần hai phép tính liên tiếp.", "concept"],
  ["g3_practice_ch4", "Bài 29. Luyện tập chung", "Phép nhân, phép chia trong phạm vi 100", "Củng cố nhân, chia, gấp, giảm và bài toán hai bước.", "arithmetic"],
  ["g3_millimeter", "Bài 30. Mi - li - mét", "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", "Làm quen đơn vị mi-li-mét (mm).", "estimate"],
  ["g3_gram", "Bài 31. Gam", "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", "Làm quen đơn vị gam (g) đo khối lượng nhỏ.", "estimate"],
  ["g3_milliliter", "Bài 32. Mi - li - lít", "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", "Làm quen đơn vị mi-li-lít (ml).", "estimate"],
  ["g3_temperature", "Bài 33. Nhiệt độ, Đơn vị đo nhiệt độ", "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", "Đọc nhiệt độ và đơn vị độ C.", "estimate"],
  ["g3_measure_exp", "Bài 34. Thực hành và trải nghiệm với các đơn vị mi - li - mét, gam, mi - li - lít, độ C", "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", "Thực hành đo mm, g, ml và nhiệt độ.", "estimate"],
  ["g3_practice_ch5", "Bài 35. Luyện tập chung", "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", "Củng cố mm, g, ml và độ C.", "estimate"],
  ["g3_mul_3d_1d", "Bài 36. Nhân số có ba chữ số với số có một chữ số", "Phép nhân, phép chia trong phạm vi 1000", "Nhân số có ba chữ số với số có một chữ số.", "arithmetic"],
  ["g3_div_3d_1d", "Bài 37. Chia số có ba chữ số cho số có một chữ số", "Phép nhân, phép chia trong phạm vi 1000", "Chia số có ba chữ số cho số có một chữ số.", "arithmetic"],
  ["g3_expression", "Bài 38. Biểu thức số. Tính giá trị của biểu thức số", "Phép nhân, phép chia trong phạm vi 1000", "Tính giá trị biểu thức có hai phép tính.", "pemdas"],
  ["g3_compare_times", "Bài 39. So sánh số lớn gấp mấy lần số bé", "Phép nhân, phép chia trong phạm vi 1000", "Tìm số lớn gấp mấy lần số bé bằng phép chia.", "ratio"],
  ["g3_practice_ch6", "Bài 40. Luyện tập chung", "Phép nhân, phép chia trong phạm vi 1000", "Củng cố nhân, chia 1000, biểu thức và gấp lần.", "pemdas"],
  ["g3_review_mul_div", "Bài 41. Ôn tập phép nhân, phép chia trong phạm vi 100, 1000", "Ôn tập học kì 1", "Ôn tập nhân, chia và bảng nhân, chia.", "arithmetic"],
  ["g3_review_expression", "Bài 42. Ôn tập biểu thức số", "Ôn tập học kì 1", "Ôn tập thứ tự thực hiện phép tính trong biểu thức.", "pemdas"],
  ["g3_review_geo_hk1", "Bài 43. Ôn tập hình học và đo lường", "Ôn tập học kì 1", "Ôn tập hình phẳng, khối và đo lường.", "geometry"],
  ["g3_review_hk1", "Bài 44. Ôn tập chung", "Ôn tập học kì 1", "Ôn tập tổng hợp học kì 1.", "concept"],
  ["g3_four_digit", "Bài 45. Các số có bốn chữ số. Số 10000", "Các số đến 10000", "Đọc, viết số có bốn chữ số và số 10000.", "place"],
  ["g3_compare_10000", "Bài 46. So sánh các số trong phạm vi 10000", "Các số đến 10000", "So sánh, sắp xếp số đến 10000.", "numberLine"],
  ["g3_roman_numerals", "Bài 47. Làm quen với chữ số La Mã", "Các số đến 10000", "Đọc, viết một số chữ số La Mã cơ bản.", "concept"],
  ["g3_round_numbers", "Bài 48. Làm tròn số đến hàng chục, hàng trăm", "Các số đến 10000", "Làm tròn số đến hàng chục, hàng trăm.", "estimate"],
  ["g3_practice_ch8", "Bài 49. Luyện tập chung", "Các số đến 10000", "Củng cố số đến 10000 và làm tròn.", "place"],
  ["g3_perimeter", "Bài 50. Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông", "Chu vi, diện tích một số hình phẳng", "Tính chu vi các hình phẳng quen thuộc.", "geometry"],
  ["g3_area_square_cm", "Bài 51. Diện tích của một hình. Xăng - ti - mét vuông", "Chu vi, diện tích một số hình phẳng", "Làm quen xăng-ti-mét vuông (cm²) đo diện tích.", "triangle"],
  ["g3_area_rect_square", "Bài 52. Diện tích hình chữ nhật, diện tích hình vuông", "Chu vi, diện tích một số hình phẳng", "Tính diện tích hình chữ nhật và hình vuông.", "geometry"],
  ["g3_practice_ch9", "Bài 53. Luyện tập chung", "Chu vi, diện tích một số hình phẳng", "Củng cố chu vi và diện tích.", "geometry"],
  ["g3_add_10000", "Bài 54. Phép cộng trong phạm vi 10000", "Cộng, trừ, nhân, chia trong phạm vi 10000", "Cộng các số có đến bốn chữ số.", "arithmetic"],
  ["g3_sub_10000", "Bài 55. Phép trừ trong phạm vi 10000", "Cộng, trừ, nhân, chia trong phạm vi 10000", "Trừ các số có đến bốn chữ số.", "arithmetic"],
  ["g3_mul_4d_1d", "Bài 56. Nhân số có bốn chữ số với một số có một chữ số", "Cộng, trừ, nhân, chia trong phạm vi 10000", "Nhân số có bốn chữ số với số có một chữ số.", "arithmetic"],
  ["g3_div_4d_1d", "Bài 57. Chia số có bốn chữ số cho số có một chữ số", "Cộng, trừ, nhân, chia trong phạm vi 10000", "Chia số có bốn chữ số cho số có một chữ số.", "arithmetic"],
  ["g3_practice_ch10", "Bài 58. Luyện tập chung", "Cộng, trừ, nhân, chia trong phạm vi 10000", "Củng cố bốn phép tính trong phạm vi 10000.", "arithmetic"],
  ["g3_five_digit", "Bài 59. Các số có năm chữ số. Số 100000", "Các số đến 100000", "Đọc, viết số có năm chữ số và số 100000.", "place"],
  ["g3_compare_100000", "Bài 60. So sánh các số trong phạm vi 100000", "Các số đến 100000", "So sánh số có năm chữ số.", "numberLine"],
  ["g3_round_100000", "Bài 61. Làm tròn số đến hàng nghìn, hàng chục nghìn", "Các số đến 100000", "Làm tròn số đến hàng nghìn, chục nghìn.", "estimate"],
  ["g3_practice_ch11", "Bài 62. Luyện tập chung", "Các số đến 100000", "Củng cố số đến 100000 và làm tròn.", "place"],
  ["g3_add_100000", "Bài 63. Phép cộng trong phạm vi 100000", "Cộng, trừ trong phạm vi 100000", "Cộng các số có đến năm chữ số.", "arithmetic"],
  ["g3_sub_100000", "Bài 64. Phép trừ trong phạm vi 100000", "Cộng, trừ trong phạm vi 100000", "Trừ các số có đến năm chữ số.", "arithmetic"],
  ["g3_practice_ch12", "Bài 65. Luyện tập chung", "Cộng, trừ trong phạm vi 100000", "Củng cố cộng, trừ trong phạm vi 100000.", "arithmetic"],
  ["g3_clock_month", "Bài 66. Xem đồng hồ. Tháng - năm", "Xem đồng hồ. Tháng - năm. Tiền Việt Nam", "Đọc giờ và nhận biết tháng, năm.", "concept"],
  ["g3_clock_exp", "Bài 67. Thực hành xem đồng hồ, xem lịch", "Xem đồng hồ. Tháng - năm. Tiền Việt Nam", "Thực hành xem đồng hồ và lịch.", "concept"],
  ["g3_vnd_money", "Bài 68. Tiền Việt Nam", "Xem đồng hồ. Tháng - năm. Tiền Việt Nam", "Nhận biết tiền Việt Nam và tính tiền.", "estimate"],
  ["g3_practice_ch13", "Bài 69. Luyện tập chung", "Xem đồng hồ. Tháng - năm. Tiền Việt Nam", "Củng cố thời gian và tiền Việt Nam.", "concept"],
  ["g3_mul_5d_1d", "Bài 70. Nhân số có năm chữ số với số có một chữ số", "Nhân, chia trong phạm vi 100000", "Nhân số có năm chữ số với số có một chữ số.", "arithmetic"],
  ["g3_div_5d_1d", "Bài 71. Chia số có năm chữ số cho số có một chữ số", "Nhân, chia trong phạm vi 100000", "Chia số có năm chữ số cho số có một chữ số.", "arithmetic"],
  ["g3_practice_ch14", "Bài 72. Luyện tập chung", "Nhân, chia trong phạm vi 100000", "Củng cố nhân, chia số lớn.", "arithmetic"],
  ["g3_data_collect", "Bài 73. Thu thập, phân loại, ghi chép số liệu. Bảng số liệu", "Làm quen với yếu tố thống kê, xác suất", "Thu thập, phân loại và lập bảng số liệu.", "data"],
  ["g3_probability", "Bài 74. Khả năng xảy ra của một sự kiện", "Làm quen với yếu tố thống kê, xác suất", "Nhận biết sự kiện chắc chắn, có thể, không thể.", "probability"],
  ["g3_data_exp", "Bài 75. Thực hành và trải nghiệm thu thập, phân loại, ghi chép số liệu, đọc bảng số liệu", "Làm quen với yếu tố thống kê, xác suất", "Thực hành thu thập và đọc bảng số liệu.", "chart"],
  ["g3_review_numbers", "Bài 76. Ôn tập các số trong phạm vi 10000, 100000", "Ôn tập cuối năm", "Ôn tập số đến 10000 và 100000.", "place"],
  ["g3_review_add_sub", "Bài 77. Ôn tập phép cộng, phép trừ trong phạm vi 100000", "Ôn tập cuối năm", "Ôn tập cộng, trừ số lớn.", "arithmetic"],
  ["g3_review_mul_div_final", "Bài 78. Ôn tập phép nhân, phép chia trong phạm vi 100000", "Ôn tập cuối năm", "Ôn tập nhân, chia số lớn.", "arithmetic"],
  ["g3_review_geo_final", "Bài 79. Ôn tập hình học và đo lường", "Ôn tập cuối năm", "Ôn tập chu vi, diện tích và đo lường.", "geometry"],
  ["g3_review_stats", "Bài 80. Ôn tập bảng số liệu, khả năng xảy ra của một sự kiện", "Ôn tập cuối năm", "Ôn tập thống kê và xác suất.", "probability"],
  ["g3_review_final", "Bài 81. Ôn tập chung", "Ôn tập cuối năm", "Ôn tập tổng hợp cuối năm.", "concept"],
];

const chapters = [...new Set(grade3.map((lesson) => lesson[2]))];

const core = {
  g3_review_1000: ["Số đến 1000", "Đọc, viết, so sánh số có ba chữ số; 1000 = 1 nghìn.", "742 > 724 vì 4 chục > 2 chục.", "So từ hàng trăm, chục, đơn vị."],
  g3_add_sub_review: ["Cộng trừ 1000", "Cộng, trừ ba chữ số có hoặc không nhớ.", "468 + 175 = 643; 503 - 267 = 236.", "Thẳng hàng trăm, chục, đơn vị."],
  g3_add_sub_parts: ["Thành phần phép tính", "Tìm số hạng: tổng - số hạng; tìm số trừ: số bị trừ - hiệu.", "x + 45 = 120 thì x = 75.", "Gọi đúng tên từng số."],
  g3_table_2_5: ["Bảng nhân 2, 5", "Nhân 2 là cộng đôi; nhân 5 kết thúc 0 hoặc 5.", "8 × 5 = 40; 35 : 5 = 7.", "Chia kiểm tra bằng nhân."],
  g3_table_3: ["Bảng nhân 3", "Bảng nhân 3: 3, 6, 9, 12...", "7 × 3 = 21.", "Đếm thêm 3 mỗi lần."],
  g3_table_4: ["Bảng nhân 4", "Bảng nhân 4: 4, 8, 12, 16...", "9 × 4 = 36.", "Nhân 4 là cộng bốn lần."],
  g3_review_geo_measure: ["Ôn hình và đo", "Hình phẳng, khối; kg, l, dm, m.", "Hình vuông 4 cạnh bằng nhau.", "Phân biệt phẳng và khối."],
  g3_practice_ch1: ["Củng cố chương 1", "Số 1000, cộng trừ, bảng nhân 2-4.", "6 × 4 = 24; 856 > 849.", "Đọc kỹ yêu cầu từng câu."],
  g3_table_6: ["Bảng nhân 6", "6 × 7 = 42; 54 : 6 = 9.", "6 × 8 = 48.", "Thuộc bảng giúp tính nhanh."],
  g3_table_7: ["Bảng nhân 7", "7 × 6 = 42; 63 : 7 = 9.", "7 × 9 = 63.", "Dùng bảng nhân ngược cho chia."],
  g3_table_8: ["Bảng nhân 8", "8 × 5 = 40; 72 : 8 = 9.", "8 × 7 = 56.", "Nhân 8 là cộng 8 lần."],
  g3_table_9: ["Bảng nhân 9", "9 × 4 = 36; 81 : 9 = 9.", "9 × 9 = 81.", "Tổng các chữ số của tích với 9 có quy luật."],
  g3_mul_div_parts: ["Thành phần nhân chia", "Tìm thừa số: tích : thừa số; tìm số chia: số bị chia : thương.", "x × 6 = 54 thì x = 9.", "Không chia cho 0."],
  g3_fraction_part: ["Một phần mấy", "Chia đều thành n phần, lấy 1 phần là 1/n.", "1/4 của 20 là 20 : 4 = 5.", "Mẫu số là số phần bằng nhau."],
  g3_practice_ch2: ["Nhân chia tổng hợp", "Bảng 6-9 và một phần mấy.", "48 : 6 = 8; 1/3 của 15 là 5.", "Chọn phép tính theo đề."],
  g3_midpoint: ["Trung điểm", "Trung điểm chia đoạn thành hai phần bằng nhau.", "M là trung điểm AB thì AM = MB.", "Dùng thước đo hai nửa bằng nhau."],
  g3_circle: ["Hình tròn", "Tâm O; bán kính OM; đường kính đi qua tâm.", "Đường kính d = 2 × r.", "Bán kính từ tâm đến đường tròn."],
  g3_angle: ["Góc vuông", "Góc vuông 90°; góc nhọn < 90°; góc tù > 90°.", "Góc tại góc tờ A4 là góc vuông.", "Dùng êke kiểm tra góc vuông."],
  g3_plane_shapes: ["Hình phẳng", "Tam giác 3 cạnh; tứ giác 4 cạnh; HCN 4 góc vuông.", "Hình vuông vừa là HCN vừa có 4 cạnh bằng.", "Đếm cạnh và góc để phân loại."],
  g3_draw_practice: ["Vẽ hình", "Vẽ góc vuông, đường tròn, HCN, vuông.", "Dùng compa cho đường tròn.", "Vẽ nhẹ trước khi tô đậm."],
  g3_cube_box: ["Hình khối", "Khối lập phương 6 mặt vuông; hộp chữ nhật 6 mặt HCN.", "Hộp giấy thường là khối hộp chữ nhật.", "Khối có chiều cao, rộng, dài."],
  g3_practice_ch3: ["Củng cố hình", "Điểm giữa, trung điểm, góc, hình khối.", "Khối lập phương có 12 cạnh.", "Phân biệt hình phẳng và khối."],
  g3_mul_2d_1d: ["Nhân có nhớ", "Nhân từ hàng đơn vị, nhớ sang chục.", "23 × 4 = 92 (3×4=12, nhớ 1).", "Thẳng hàng khi đặt tính."],
  g3_multiply_times: ["Gấp lên nhiều lần", "Gấp a lên n lần: a × n.", "Gấp 7 lên 5 lần: 7 × 5 = 35.", "Gấp dùng nhân, không cộng."],
  g3_division_remainder: ["Chia có dư", "Số bị chia = thương × số chia + dư; dư < số chia.", "29 : 5 = 5 dư 4.", "Ghi cả thương và số dư."],
  g3_div_2d_1d: ["Chia hai chữ số", "Chia từ hàng chục, nhân trừ từng bước.", "84 : 4 = 21.", "Kiểm tra: thương × số chia + dư."],
  g3_reduce_times: ["Giảm đi nhiều lần", "Giảm a đi n lần: a : n.", "Giảm 48 đi 6 lần: 48 : 6 = 8.", "Giảm dùng chia."],
  g3_two_step: ["Hai bước tính", "Giải phép trước, dùng kết quả cho phép sau.", "Mua 3 gói, mỗi gói 5 quả: 3 × 5 = 15 quả.", "Ghi từng bước trung gian."],
  g3_practice_ch4: ["Củng cố nhân chia", "Nhân, chia, gấp, giảm, hai bước.", "36 : 6 = 6; gấp 4 lên 8 lần: 32.", "Đọc từ khóa gấp, giảm."],
  g3_millimeter: ["Mi-li-mét", "1 cm = 10 mm; mm đo chi tiết nhỏ.", "Thước kẻ vạch mm.", "Chọn mm cho độ dài ngắn."],
  g3_gram: ["Gam", "g đo khối lượng nhỏ; 1000 g = 1 kg.", "Quả táo khoảng 150 g.", "Viết đơn vị g sau số."],
  g3_milliliter: ["Mi-li-lít", "ml đo chất lỏng ít; 1000 ml = 1 l.", "Muỗng cà phê khoảng 5 ml.", "ml dùng cho chai nhỏ."],
  g3_temperature: ["Độ C", "Nhiệt kế đo °C; nhiệt độ không âm trong đời sống.", "Nước đá tan khoảng 0°C.", "Đọc vạch và số trên nhiệt kế."],
  g3_measure_exp: ["Đo thực tế", "Dùng thước, cân, ca, nhiệt kế.", "1 cm = 10 mm; 500 g = 0,5 kg.", "Chọn đơn vị phù hợp."],
  g3_practice_ch5: ["Củng cố đo lường", "mm, g, ml, °C.", "2 cm = 20 mm.", "Ghi đơn vị trong đáp số."],
  g3_mul_3d_1d: ["Nhân ba chữ số", "Nhân từng hàng, cộng các tích phụ.", "125 × 4 = 500.", "Nhân đơn vị trước, nhớ dần."],
  g3_div_3d_1d: ["Chia ba chữ số", "Chia từng chữ số của số bị chia.", "468 : 4 = 117.", "Mỗi lần chia: nhân, trừ, hạ."],
  g3_expression: ["Biểu thức số", "Nhân chia trước; cộng trừ sau; ngoặc trước.", "12 + 8 × 2 = 28.", "Làm trong ngoặc trước."],
  g3_compare_times: ["Gấp mấy lần", "Số lớn gấp số bé mấy lần = số lớn : số bé.", "24 gấp 6 lần 4 vì 24 : 6 = 4.", "Không trừ khi hỏi gấp mấy lần."],
  g3_practice_ch6: ["Củng cố 1000", "Nhân, chia, biểu thức, gấp lần.", "200 × 3 = 600; 45 - 15 : 3 = 40.", "Thứ tự phép tính đúng."],
  g3_review_mul_div: ["Ôn nhân chia", "Bảng nhân chia và nhân chia trong 100, 1000.", "7 × 8 = 56; 144 : 12 = 12.", "Kiểm tra bằng phép ngược."],
  g3_review_expression: ["Ôn biểu thức", "Tính giá trị biểu thức hai phép tính.", "50 - 10 × 3 = 20.", "Nhân trước cộng trừ."],
  g3_review_geo_hk1: ["Ôn hình HK1", "Góc, hình tròn, chu vi cơ bản.", "Tam giác có 3 cạnh.", "Ôn từng chủ đề đã học."],
  g3_review_hk1: ["Tổng hợp HK1", "Số, phép tính, hình, đo lường.", "6 × 9 = 54; 1/2 của 18 là 9.", "Đọc kỹ đề trước khi trả lời."],
  g3_four_digit: ["Số bốn chữ số", "Hàng nghìn, trăm, chục, đơn vị; 10000.", "3 456: 3 nghìn 4 trăm 5 chục 6 đơn vị.", "9999 + 1 = 10000."],
  g3_compare_10000: ["So sánh 10000", "So từ hàng nghìn đến đơn vị.", "5 308 > 5 299.", "Hàng bằng nhau thì so hàng thấp hơn."],
  g3_roman_numerals: ["Chữ số La Mã", "I=1, V=5, X=10; VI=6, IX=9.", "XIV = 14.", "Không viết quá ba chữ lặp liên tiếp."],
  g3_round_numbers: ["Làm tròn số", "Nhìn chữ số hàng kế bên phải: ≥5 thì tăng 1.", "456 làm tròn hàng chục là 460.", "Xác định đúng hàng làm tròn."],
  g3_practice_ch8: ["Củng cố số 10000", "Đọc, viết, so sánh, làm tròn.", "7 850 làm tròn hàng trăm là 7 900.", "Kiểm tra bằng ước lượng."],
  g3_perimeter: ["Chu vi", "Chu vi = tổng độ dài các cạnh bao quanh.", "HCN dài 6, rộng 4 có chu vi (6+4)×2=20.", "Không nhầm với diện tích."],
  g3_area_square_cm: ["Xăng-ti-mét vuông", "cm² là diện tích hình vuông cạnh 1 cm.", "Hình vuông cạnh 3 cm có diện tích 9 cm².", "Diện tích dùng đơn vị vuông."],
  g3_area_rect_square: ["Diện tích", "HCN: S = dài × rộng; vuông: S = cạnh × cạnh.", "HCN 5×3 có S=15 cm².", "Cùng đơn vị đo cho cạnh."],
  g3_practice_ch9: ["Chu vi và diện tích", "Tính chu vi và diện tích HCN, vuông.", "Vuông cạnh 4: chu vi 16, diện tích 16.", "Chu vi cm, diện tích cm²."],
  g3_add_10000: ["Cộng 10000", "Cộng từng hàng, nhớ sang hàng cao.", "2 456 + 1 378 = 3 834.", "Thẳng hàng nghìn, trăm, chục, đơn vị."],
  g3_sub_10000: ["Trừ 10000", "Trừ từng hàng, mượn nếu cần.", "5 020 - 1 875 = 3 145.", "Kiểm tra bằng phép cộng."],
  g3_mul_4d_1d: ["Nhân bốn chữ số", "Nhân từng chữ số số có một chữ số.", "1 234 × 2 = 2 468.", "Ghi từng dòng tích phụ."],
  g3_div_4d_1d: ["Chia bốn chữ số", "Chia từng chữ số, nhân trừ lặp.", "5 616 : 8 = 702.", "Thương nhân số chia cộng dư = số bị chia."],
  g3_practice_ch10: ["Củng cố 10000", "Bốn phép tính trong 10000.", "3 200 : 8 = 400.", "Chọn phép tính theo lời bài."],
  g3_five_digit: ["Số năm chữ số", "Hàng chục nghìn; 100 000.", "45 678: 4 chục nghìn 5 nghìn...", "Đọc từ trái sang phải."],
  g3_compare_100000: ["So sánh 100000", "So từ hàng cao nhất.", "89 999 < 90 000.", "Số chữ số nhiều hơn thì lớn hơn (cùng dạng)."],
  g3_round_100000: ["Làm tròn lớn", "Làm tròn đến nghìn, chục nghìn.", "46 500 làm tròn nghìn là 47 000.", "Nhìn hàng bên phải hàng làm tròn."],
  g3_practice_ch11: ["Củng cố 100000", "Số năm chữ số và làm tròn.", "12 450 làm tròn chục nghìn là 10 000.", "Xác định hàng làm tròn."],
  g3_add_100000: ["Cộng 100000", "Cộng số lớn có nhớ.", "23 456 + 45 678 = 69 134.", "Đặt tính thẳng hàng."],
  g3_sub_100000: ["Trừ 100000", "Trừ số lớn có mượn.", "80 000 - 15 375 = 64 625.", "Kiểm tra bằng cộng ngược."],
  g3_practice_ch12: ["Củng cố cộng trừ lớn", "Cộng, trừ trong 100000.", "50 000 - 12 500 = 37 500.", "Đọc kỹ số bị trừ và số trừ."],
  g3_clock_month: ["Giờ và lịch", "Kim ngắn giờ, kim dài phút; 1 năm 12 tháng.", "3 giờ 15 phút: kim dài ở 3.", "60 phút = 1 giờ."],
  g3_clock_exp: ["Xem đồng hồ", "Thực hành đọc giờ và ngày tháng.", "Thứ Hai ngày 10 tháng 9.", "Kim ngắn chỉ giờ."],
  g3_vnd_money: ["Tiền Việt Nam", "Nhận tờ tiền; tính tổng tiền.", "2 tờ 10 000 đ = 20 000 đ.", "Cộng giá trị từng tờ."],
  g3_practice_ch13: ["Thời gian và tiền", "Giờ, tháng, tiền.", "1 giờ 30 phút = 90 phút.", "Đổi cùng đơn vị trước khi tính."],
  g3_mul_5d_1d: ["Nhân năm chữ số", "Nhân số lớn với một chữ số.", "12 345 × 3 = 37 035.", "Nhân từng hàng có nhớ."],
  g3_div_5d_1d: ["Chia năm chữ số", "Chia số lớn cho một chữ số.", "48 000 : 6 = 8 000.", "Chia từng chữ số từ trái."],
  g3_practice_ch14: ["Củng cố nhân chia lớn", "Nhân, chia trong 100000.", "25 000 × 4 = 100 000.", "Ước lượng để kiểm tra."],
  g3_data_collect: ["Bảng số liệu", "Thu thập, phân loại, ghi bảng.", "Lớp có 12 bạn thích bóng, 8 thích cầu.", "Ghi tiêu đề cột rõ ràng."],
  g3_probability: ["Khả năng xảy ra", "Chắc chắn, có thể, không thể.", "Tung xúc xắc ra 7: không thể.", "Có thể: có khi xảy ra có khi không."],
  g3_data_exp: ["Thực hành thống kê", "Khảo sát và đọc bảng.", "Tổng 12 + 8 = 20 bạn.", "Đếm chính xác từng nhóm."],
  g3_review_numbers: ["Ôn số lớn", "Số đến 10000 và 100000.", "67 890 > 67 809.", "So từ hàng cao."],
  g3_review_add_sub: ["Ôn cộng trừ", "Tính trong 100000.", "45 000 + 23 500 = 68 500.", "Thẳng hàng khi đặt tính."],
  g3_review_mul_div_final: ["Ôn nhân chia lớn", "Nhân, chia số lớn.", "15 000 × 6 = 90 000.", "Kiểm tra bằng phép ngược."],
  g3_review_geo_final: ["Ôn hình và đo", "Chu vi, diện tích, mm, g, ml.", "Vuông cạnh 5: S=25 cm².", "Ghi đúng đơn vị."],
  g3_review_stats: ["Ôn thống kê", "Bảng số liệu và khả năng.", "Tung đồng xu: có thể sấp hoặc ngửa.", "Đọc bảng từ tiêu đề cột."],
  g3_review_final: ["Ôn cuối năm", "Tổng hợp toàn bộ lớp 3.", "8 × 7 = 56; chu vi vuông 4: 16 cm.", "Đọc kỹ đề trước khi trả lời."],
};

const questions = {
  g3_review_1000: [
      [
        "multiple_choice",
        "Số 4567 có mấy chữ số?",
        [
          "4",
          "3",
          "5",
          "6"
        ],
        "4",
        "Đếm chữ số từ trái sang."
      ],
      [
        "input",
        "Số liền sau 999 là?",
        "1000",
        "999 + 1 = 1000."
      ]
    ],
  g3_add_sub_review: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_add_sub_parts: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_table_2_5: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_table_3: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_table_4: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_review_geo_measure: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_practice_ch1: [
      [
        "input",
        "Số liền trước 500 là?",
        "499",
        "500 - 1 = 499."
      ],
      [
        "multiple_choice",
        "Trên tia số, số bên phải so với số bên trái?",
        [
          "Lớn hơn",
          "Nhỏ hơn",
          "Bằng nhau"
        ],
        "Lớn hơn",
        "Tia số tăng sang phải."
      ]
    ],
  g3_table_6: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_table_7: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_table_8: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_table_9: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_mul_div_parts: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_fraction_part: [
      [
        "multiple_choice",
        "Tô màu 1/4 hình vuông nghĩa là?",
        [
          "Chia 4 phần bằng nhau, lấy 1 phần",
          "Chia 2 phần",
          "Lấy cả hình",
          "Chia 3 phần"
        ],
        "Chia 4 phần bằng nhau, lấy 1 phần",
        "Mẫu số là số phần bằng nhau."
      ],
      [
        "input",
        "Một phần ba viết là phân số gì? (dạng a/b)",
        "1/3",
        "1 phần trên 3 phần bằng nhau."
      ]
    ],
  g3_practice_ch2: [
      [
        "input",
        "1/2 và 1/4, phân số nào lớn hơn?",
        "1/2",
        "Cùng chia hình, 1/2 lớn hơn 1/4."
      ],
      [
        "multiple_choice",
        "1/5 của 20 là?",
        [
          "4",
          "5",
          "10",
          "25"
        ],
        "4",
        "20 : 5 = 4."
      ]
    ],
  g3_midpoint: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_circle: [
      [
        "multiple_choice",
        "Đoạn thẳng từ tâm đến điểm trên đường tròn gọi là?",
        [
          "Bán kính",
          "Đường kính",
          "Cạnh",
          "Góc"
        ],
        "Bán kính",
        "Bán kính nối tâm với đường tròn."
      ],
      [
        "input",
        "Đường kính gấp mấy lần bán kính?",
        "2",
        "Đường kính = 2 bán kính."
      ]
    ],
  g3_angle: [
      [
        "input",
        "Góc vuông bằng bao nhiêu độ?",
        "90",
        "Góc vuông = 90°."
      ],
      [
        "multiple_choice",
        "Góc nhỏ hơn góc vuông gọi là?",
        [
          "Góc nhọn",
          "Góc tù",
          "Góc bẹt",
          "Góc thẳng"
        ],
        "Góc nhọn",
        "Góc nhọn < 90°."
      ]
    ],
  g3_plane_shapes: [
      [
        "multiple_choice",
        "Hình tam giác có mấy cạnh?",
        [
          "3",
          "4",
          "5",
          "6"
        ],
        "3",
        "Tam giác có 3 cạnh."
      ],
      [
        "input",
        "1 cm² là diện tích hình vuông cạnh bao nhiêu cm?",
        "1",
        "Hình vuông cạnh 1 cm."
      ]
    ],
  g3_draw_practice: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_cube_box: [
      [
        "multiple_choice",
        "Hộp sữa giống hình khối nào?",
        [
          "Khối hộp chữ nhật",
          "Khối cầu",
          "Khối trụ",
          "Tam giác"
        ],
        "Khối hộp chữ nhật",
        "Hộp có 6 mặt chữ nhật."
      ],
      [
        "input",
        "Khối lập phương có mấy mặt?",
        "6",
        "6 mặt vuông bằng nhau."
      ]
    ],
  g3_practice_ch3: [
      [
        "multiple_choice",
        "Hộp sữa giống hình khối nào?",
        [
          "Khối hộp chữ nhật",
          "Khối cầu",
          "Khối trụ",
          "Tam giác"
        ],
        "Khối hộp chữ nhật",
        "Hộp có 6 mặt chữ nhật."
      ],
      [
        "input",
        "Khối lập phương có mấy mặt?",
        "6",
        "6 mặt vuông bằng nhau."
      ]
    ],
  g3_mul_2d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_multiply_times: [
      [
        "input",
        "Gấp 6 lên 4 lần được số nào?",
        "24",
        "6 × 4 = 24."
      ],
      [
        "multiple_choice",
        "Giảm 48 đi 6 lần được?",
        [
          "8",
          "42",
          "288",
          "6"
        ],
        "8",
        "48 : 6 = 8."
      ]
    ],
  g3_division_remainder: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_div_2d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_reduce_times: [
      [
        "input",
        "Gấp 6 lên 4 lần được số nào?",
        "24",
        "6 × 4 = 24."
      ],
      [
        "multiple_choice",
        "Giảm 48 đi 6 lần được?",
        [
          "8",
          "42",
          "288",
          "6"
        ],
        "8",
        "48 : 6 = 8."
      ]
    ],
  g3_two_step: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_practice_ch4: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_millimeter: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_gram: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_milliliter: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_temperature: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_measure_exp: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_practice_ch5: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_mul_3d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_div_3d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_expression: [
      [
        "input",
        "Tính 12 + 8 × 2.",
        "28",
        "Nhân trước: 8 × 2 = 16; 12 + 16 = 28."
      ],
      [
        "multiple_choice",
        "Trong 45 - 15 : 3, phép nào làm trước?",
        [
          "Chia",
          "Trừ",
          "Cộng",
          "Nhân"
        ],
        "Chia",
        "Chia trước cộng trừ."
      ]
    ],
  g3_compare_times: [
      [
        "input",
        "Gấp 6 lên 4 lần được số nào?",
        "24",
        "6 × 4 = 24."
      ],
      [
        "multiple_choice",
        "Giảm 48 đi 6 lần được?",
        [
          "8",
          "42",
          "288",
          "6"
        ],
        "8",
        "48 : 6 = 8."
      ]
    ],
  g3_practice_ch6: [
      [
        "input",
        "Tính 12 + 8 × 2.",
        "28",
        "Nhân trước: 8 × 2 = 16; 12 + 16 = 28."
      ],
      [
        "multiple_choice",
        "Trong 45 - 15 : 3, phép nào làm trước?",
        [
          "Chia",
          "Trừ",
          "Cộng",
          "Nhân"
        ],
        "Chia",
        "Chia trước cộng trừ."
      ]
    ],
  g3_review_mul_div: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_review_expression: [
      [
        "input",
        "Tính 12 + 8 × 2.",
        "28",
        "Nhân trước: 8 × 2 = 16; 12 + 16 = 28."
      ],
      [
        "multiple_choice",
        "Trong 45 - 15 : 3, phép nào làm trước?",
        [
          "Chia",
          "Trừ",
          "Cộng",
          "Nhân"
        ],
        "Chia",
        "Chia trước cộng trừ."
      ]
    ],
  g3_review_geo_hk1: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_review_hk1: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_four_digit: [
      [
        "multiple_choice",
        "Số 4567 có mấy chữ số?",
        [
          "4",
          "3",
          "5",
          "6"
        ],
        "4",
        "Đếm chữ số từ trái sang."
      ],
      [
        "input",
        "Số liền sau 999 là?",
        "1000",
        "999 + 1 = 1000."
      ]
    ],
  g3_compare_10000: [
      [
        "input",
        "Số liền trước 500 là?",
        "499",
        "500 - 1 = 499."
      ],
      [
        "multiple_choice",
        "Trên tia số, số bên phải so với số bên trái?",
        [
          "Lớn hơn",
          "Nhỏ hơn",
          "Bằng nhau"
        ],
        "Lớn hơn",
        "Tia số tăng sang phải."
      ]
    ],
  g3_roman_numerals: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_round_numbers: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_practice_ch8: [
      [
        "multiple_choice",
        "Số 4567 có mấy chữ số?",
        [
          "4",
          "3",
          "5",
          "6"
        ],
        "4",
        "Đếm chữ số từ trái sang."
      ],
      [
        "input",
        "Số liền sau 999 là?",
        "1000",
        "999 + 1 = 1000."
      ]
    ],
  g3_perimeter: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_area_square_cm: [
      [
        "multiple_choice",
        "Hình tam giác có mấy cạnh?",
        [
          "3",
          "4",
          "5",
          "6"
        ],
        "3",
        "Tam giác có 3 cạnh."
      ],
      [
        "input",
        "1 cm² là diện tích hình vuông cạnh bao nhiêu cm?",
        "1",
        "Hình vuông cạnh 1 cm."
      ]
    ],
  g3_area_rect_square: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_practice_ch9: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_add_10000: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_sub_10000: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_mul_4d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_div_4d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_practice_ch10: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_five_digit: [
      [
        "multiple_choice",
        "Số 4567 có mấy chữ số?",
        [
          "4",
          "3",
          "5",
          "6"
        ],
        "4",
        "Đếm chữ số từ trái sang."
      ],
      [
        "input",
        "Số liền sau 999 là?",
        "1000",
        "999 + 1 = 1000."
      ]
    ],
  g3_compare_100000: [
      [
        "input",
        "Số liền trước 500 là?",
        "499",
        "500 - 1 = 499."
      ],
      [
        "multiple_choice",
        "Trên tia số, số bên phải so với số bên trái?",
        [
          "Lớn hơn",
          "Nhỏ hơn",
          "Bằng nhau"
        ],
        "Lớn hơn",
        "Tia số tăng sang phải."
      ]
    ],
  g3_round_100000: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_practice_ch11: [
      [
        "multiple_choice",
        "Số 4567 có mấy chữ số?",
        [
          "4",
          "3",
          "5",
          "6"
        ],
        "4",
        "Đếm chữ số từ trái sang."
      ],
      [
        "input",
        "Số liền sau 999 là?",
        "1000",
        "999 + 1 = 1000."
      ]
    ],
  g3_add_100000: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_sub_100000: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_practice_ch12: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_clock_month: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_clock_exp: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_vnd_money: [
      [
        "input",
        "1 cm = ? mm",
        "10",
        "1 cm = 10 mm."
      ],
      [
        "multiple_choice",
        "Đo khối lượng quả táo nhỏ nên dùng?",
        [
          "g",
          "kg",
          "km",
          "l"
        ],
        "g",
        "g đo vật nhẹ."
      ]
    ],
  g3_practice_ch13: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
  g3_mul_5d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_div_5d_1d: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_practice_ch14: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_data_collect: [
      [
        "input",
        "5 bạn thích đỏ, 3 bạn thích xanh. Tổng bao nhiêu bạn?",
        "8",
        "5 + 3 = 8."
      ],
      [
        "multiple_choice",
        "Bảng số liệu dùng để?",
        [
          "Ghi và so sánh số liệu",
          "Vẽ hình tròn",
          "Tính chu vi",
          "Đo nhiệt độ"
        ],
        "Ghi và so sánh số liệu",
        "Bảng giúp đọc số liệu nhanh."
      ]
    ],
  g3_probability: [
      [
        "multiple_choice",
        "Tung xúc xắc ra số 7 là?",
        [
          "Không thể",
          "Chắc chắn",
          "Có thể chắc chắn"
        ],
        "Không thể",
        "Xúc xắc chỉ có 1-6."
      ],
      [
        "input",
        "Mặt trời mọc buổi sáng: chắc chắn, có thể hay không thể?",
        "chắc chắn",
        "Luôn xảy ra mỗi ngày."
      ]
    ],
  g3_data_exp: [
      [
        "multiple_choice",
        "Biểu đồ cột dùng để?",
        [
          "So sánh số liệu",
          "Tính diện tích",
          "Vẽ góc",
          "Đo độ dài"
        ],
        "So sánh số liệu",
        "Cột cao thể hiện số lớn hơn."
      ],
      [
        "input",
        "Bảng ghi 4 nhóm: 2, 5, 3, 6. Tổng?",
        "16",
        "2+5+3+6=16."
      ]
    ],
  g3_review_numbers: [
      [
        "multiple_choice",
        "Số 4567 có mấy chữ số?",
        [
          "4",
          "3",
          "5",
          "6"
        ],
        "4",
        "Đếm chữ số từ trái sang."
      ],
      [
        "input",
        "Số liền sau 999 là?",
        "1000",
        "999 + 1 = 1000."
      ]
    ],
  g3_review_add_sub: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_review_mul_div_final: [
      [
        "input",
        "Tính 24 × 3.",
        "72",
        "4 × 3 = 12, nhớ 1; 2 × 3 + 1 = 7."
      ],
      [
        "multiple_choice",
        "56 : 7 = ?",
        [
          "8",
          "7",
          "9",
          "6"
        ],
        "8",
        "7 × 8 = 56."
      ]
    ],
  g3_review_geo_final: [
      [
        "input",
        "Hình vuông có mấy cạnh bằng nhau?",
        "4",
        "Hình vuông có 4 cạnh bằng nhau."
      ],
      [
        "multiple_choice",
        "Chu vi hình chữ nhật bằng?",
        [
          "(dài + rộng) × 2",
          "dài × rộng",
          "dài + rộng",
          "dài × 4"
        ],
        "(dài + rộng) × 2",
        "Cộng hai chiều rồi nhân 2."
      ]
    ],
  g3_review_stats: [
      [
        "multiple_choice",
        "Tung xúc xắc ra số 7 là?",
        [
          "Không thể",
          "Chắc chắn",
          "Có thể chắc chắn"
        ],
        "Không thể",
        "Xúc xắc chỉ có 1-6."
      ],
      [
        "input",
        "Mặt trời mọc buổi sáng: chắc chắn, có thể hay không thể?",
        "chắc chắn",
        "Luôn xảy ra mỗi ngày."
      ]
    ],
  g3_review_final: [
      [
        "multiple_choice",
        "Trong 45 + 27 = 72, 72 gọi là?",
        [
          "Tổng",
          "Số hạng",
          "Hiệu",
          "Thương"
        ],
        "Tổng",
        "Kết quả cộng là tổng."
      ],
      [
        "input",
        "Trong 63 : 9 = 7, 63 gọi là gì?",
        "số bị chia",
        "Số bị chia đứng trước dấu chia."
      ]
    ],
};

const errorPatterns = [
  ["g3_add_sub_parts", "72", "add_sub_part_error", "Nhầm tổng và số hạng", "Tìm số hạng: tổng - số hạng đã biết.", "Gọi đúng tên thành phần."],
  ["g3_table_2_5", "7", "multiply_as_add_error", "Cộng thay vì nhân", "6 × 5 = 30, không phải 6 + 5.", "Nhân là cộng lặp số hạng bằng nhau."],
  ["g3_mul_div_parts", "45", "divide_reverse_error", "Chia ngược", "56 : 8 = 7, không phải 8 : 56.", "Số bị chia đứng trước dấu chia."],
  ["g3_fraction_part", "1/2", "fraction_whole_error", "Lấy cả hình", "1/4 nghĩa chia 4 phần bằng nhau, lấy 1 phần.", "Mẫu số là số phần chia đều."],
  ["g3_mul_2d_1d", "126", "mul_carry_error", "Quên nhớ khi nhân", "23 × 4 = 92, không phải 82.", "Nhân đơn vị trước, nhớ sang chục."],
  ["g3_multiply_times", "10", "times_add_error", "Cộng thay vì gấp lần", "Gấp 7 lên 4 lần: 7 × 4 = 28.", "Gấp lần dùng phép nhân."],
  ["g3_division_remainder", "0", "remainder_ignore_error", "Bỏ số dư", "29 : 5 = 5 dư 4, không phải 5.", "Ghi rõ thương và số dư."],
  ["g3_reduce_times", "42", "reduce_sub_error", "Trừ thay vì giảm lần", "Giảm 48 đi 6 lần: 48 : 6 = 8.", "Giảm lần dùng phép chia."],
  ["g3_expression", "40", "pemdas_error", "Cộng trước nhân", "12 + 8 × 2 = 28, không phải 40.", "Nhân chia trước cộng trừ."],
  ["g3_compare_times", "2", "times_sub_error", "Trừ thay vì chia", "24 gấp 6 lần 4: 24 : 6 = 4.", "Gấp mấy lần = chia số lớn cho số bé."],
  ["g3_millimeter", "100", "mm_cm_error", "Nhầm mm và cm", "1 cm = 10 mm, không phải 100 mm.", "Nhân 10 khi đổi cm sang mm."],
  ["g3_perimeter", "20", "perimeter_area_error", "Nhầm chu vi và diện tích", "Chu vi hình vuông cạnh 5: 5 × 4 = 20 cm.", "Chu vi cộng các cạnh; diện tích nhân cạnh."],
  ["g3_round_numbers", "4600", "round_digit_error", "Làm tròn sai hàng", "4567 làm tròn hàng trăm là 4600.", "Nhìn chữ số hàng kế bên phải."],
  ["g3_probability", "chắc chắn", "probability_error", "Nhầm có thể và chắc chắn", "Tung xúc xắc ra 7: không thể.", "Chắc chắn luôn đúng; không thể không bao giờ."],
  ["g3_two_step", "50", "two_step_order_error", "Sai thứ tự hai bước", "Đọc đề xác định phép trước, phép sau.", "Làm từng bước, ghi kết quả trung gian."],
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
    makeKeypointsStepFromCore(core[id]),
    { type: "summary", title: "Ghi nhớ nhanh", content: summary }
  ];
}

function makeSkill(item, index) {
  const [id, title, chapter, description, visualization] = item;
  return {
    id,
    title,
    grade: 3,
    book: index < 44 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo: index + 1,
    domain: chapter,
    level: index < 27 ? 1 : index < 54 ? 2 : 3,
    prerequisite: index === 0 ? [] : [grade3[index - 1][0]],
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
    xp: 35 + Math.floor(index / 4) * 5,
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

function stripGrade3(items) {
  return items.filter((item) => {
    if (item.grade === 3) return false;
    const skillId = item.skill || item.id;
    return !(typeof skillId === "string" && skillId.startsWith("g3_"));
  });
}

const existingSkills = stripGrade3(await readJson(files.skills));
const existingLessons = stripGrade3(await readJson(files.lessons));
const existingQuestions = stripGrade3(await readJson(files.questions));
const existingErrors = stripGrade3(await readJson(files.errors));

const nextSkills = grade3.map(makeSkill);
const nextLessons = grade3.map(makeLesson);
const nextQuestions = grade3.flatMap(([id]) => makeQuestions(id));
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

console.log(`Added ${nextSkills.length} grade 3 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
