import { readFile, writeFile } from "node:fs/promises";
import { makeKeypointsStepFromCore } from "./lesson-keypoints.mjs";

const files = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const SOURCE = "Bám sát SGK Toán 2 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.";

const grade2 = [
  ["g2_review_100", "Bài 1. Ôn tập các số đến 100", "Ôn tập và bổ sung", "Ôn tập đọc, viết, so sánh số trong phạm vi 100.", "place"],
  ["g2_number_line", "Bài 2. Tia số. Số liền trước, số liền sau", "Ôn tập và bổ sung", "Nhận biết tia số, tìm số liền trước và số liền sau.", "numberLine"],
  ["g2_add_sub_parts", "Bài 3. Các thành phần của phép cộng, phép trừ", "Ôn tập và bổ sung", "Gọi đúng tên số hạng, tổng, số bị trừ, số trừ, hiệu.", "concept"],
  ["g2_how_many_more", "Bài 4. Hơn, kém nhau bao nhiêu", "Ôn tập và bổ sung", "Tìm số đơn vị hơn hoặc kém giữa hai số.", "concept"],
  ["g2_review_add_sub_100", "Bài 5. Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100", "Ôn tập và bổ sung", "Cộng, trừ không nhớ số có hai chữ số trong phạm vi 100.", "arithmetic"],
  ["g2_practice_ch1", "Bài 6. Luyện tập chung", "Ôn tập và bổ sung", "Củng cố số đến 100, tia số và phép tính không nhớ.", "numberLine"],
  ["g2_add_over_10", "Bài 7. Phép cộng (qua 10) trong phạm vi 20", "Phép cộng, phép trừ trong phạm vi 20", "Cộng hai số có tổng qua 10 trong phạm vi 20.", "arithmetic"],
  ["g2_add_table_10", "Bài 8. Bảng cộng (qua 10)", "Phép cộng, phép trừ trong phạm vi 20", "Thuộc bảng cộng qua 10 trong phạm vi 20.", "arithmetic"],
  ["g2_add_story", "Bài 9. Bài toán về thêm, bớt một số đơn vị", "Phép cộng, phép trừ trong phạm vi 20", "Giải bài toán thêm hoặc bớt một số đơn vị.", "concept"],
  ["g2_practice_ch2", "Bài 10. Luyện tập chung", "Phép cộng, phép trừ trong phạm vi 20", "Củng cố cộng qua 10 và bài toán thêm, bớt.", "arithmetic"],
  ["g2_sub_over_10", "Bài 11. Phép trừ (qua 10) trong phạm vi 20", "Phép cộng, phép trừ trong phạm vi 20", "Trừ hai số qua 10 trong phạm vi 20.", "arithmetic"],
  ["g2_sub_table_10", "Bài 12. Bảng trừ (qua 10)", "Phép cộng, phép trừ trong phạm vi 20", "Thuộc bảng trừ qua 10 trong phạm vi 20.", "arithmetic"],
  ["g2_more_less_story", "Bài 13. Bài toán về nhiều hơn, ít hơn một số đơn vị", "Phép cộng, phép trừ trong phạm vi 20", "Giải bài toán nhiều hơn, ít hơn một số đơn vị.", "concept"],
  ["g2_practice_ch2b", "Bài 14. Luyện tập chung", "Phép cộng, phép trừ trong phạm vi 20", "Củng cố cộng, trừ qua 10 và bài toán có lời văn.", "arithmetic"],
  ["g2_kilogram", "Bài 15. Ki-lô-gam", "Làm quen với khối lượng, dung tích", "Làm quen đơn vị đo khối lượng ki-lô-gam (kg).", "estimate"],
  ["g2_liter", "Bài 16. Lít", "Làm quen với khối lượng, dung tích", "Làm quen đơn vị đo dung tích lít (l).", "estimate"],
  ["g2_measure_exp", "Bài 17. Thực hành và trải nghiệm với các đơn vị Ki-lô-gam, Lít", "Làm quen với khối lượng, dung tích", "Thực hành đo và so sánh khối lượng, dung tích.", "estimate"],
  ["g2_practice_ch3", "Bài 18. Luyện tập chung", "Làm quen với khối lượng, dung tích", "Củng cố kg và lít trong tình huống thực tế.", "estimate"],
  ["g2_add_carry_2d1d", "Bài 19. Phép cộng (có nhớ) số có hai chữ số với số có một chữ số", "Phép cộng, phép trừ (có nhớ) trong phạm vi 100", "Cộng có nhớ sang hàng chục.", "arithmetic"],
  ["g2_add_carry_2d2d", "Bài 20. Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số", "Phép cộng, phép trừ (có nhớ) trong phạm vi 100", "Cộng hai số có hai chữ số có nhớ.", "arithmetic"],
  ["g2_practice_ch4", "Bài 21. Luyện tập chung", "Phép cộng, phép trừ (có nhớ) trong phạm vi 100", "Củng cố phép cộng có nhớ.", "arithmetic"],
  ["g2_sub_borrow_2d1d", "Bài 22. Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số", "Phép cộng, phép trừ (có nhớ) trong phạm vi 100", "Trừ có nhớ từ hàng chục.", "arithmetic"],
  ["g2_sub_borrow_2d2d", "Bài 23. Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số", "Phép cộng, phép trừ (có nhớ) trong phạm vi 100", "Trừ hai số có hai chữ số có nhớ.", "arithmetic"],
  ["g2_practice_ch4b", "Bài 24. Luyện tập chung", "Phép cộng, phép trừ (có nhớ) trong phạm vi 100", "Củng cố cộng, trừ có nhớ trong phạm vi 100.", "arithmetic"],
  ["g2_points_lines", "Bài 25. Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng", "Làm quen với hình phẳng", "Nhận biết điểm, đoạn thẳng, đường thẳng, đường cong và ba điểm thẳng hàng.", "geometry"],
  ["g2_broken_line_quad", "Bài 26. Đường gấp khúc. Hình tứ giác", "Làm quen với hình phẳng", "Nhận biết đường gấp khúc và hình tứ giác.", "geometry"],
  ["g2_fold_cut", "Bài 27. Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng", "Làm quen với hình phẳng", "Gấp, cắt, ghép hình và vẽ đoạn thẳng.", "geometry"],
  ["g2_practice_ch5", "Bài 28. Luyện tập chung", "Làm quen với hình phẳng", "Củng cố hình phẳng cơ bản.", "geometry"],
  ["g2_day_hour", "Bài 29. Ngày – giờ, giờ – phút", "Ngày – giờ, giờ – phút, ngày – tháng", "Đọc giờ trên đồng hồ và quan hệ ngày – giờ, giờ – phút.", "concept"],
  ["g2_day_month", "Bài 30. Ngày – tháng", "Ngày – giờ, giờ – phút, ngày – tháng", "Nhận biết ngày, tháng trên lịch.", "concept"],
  ["g2_clock_calendar_exp", "Bài 31. Thực hành và trải nghiệm xem đồng hồ, xem lịch", "Ngày – giờ, giờ – phút, ngày – tháng", "Thực hành xem đồng hồ và lịch.", "concept"],
  ["g2_practice_ch6", "Bài 32. Luyện tập chung", "Ngày – giờ, giờ – phút, ngày – tháng", "Củng cố thời gian, giờ, phút, ngày, tháng.", "concept"],
  ["g2_review_ops", "Bài 33. Ôn tập phép cộng, phép trừ trong phạm vi 20, 100", "Ôn tập học kì 1", "Ôn tập cộng, trừ trong phạm vi 20 và 100.", "arithmetic"],
  ["g2_review_geo", "Bài 34. Ôn tập hình phẳng", "Ôn tập học kì 1", "Ôn tập điểm, đoạn thẳng, tứ giác, đường gấp khúc.", "geometry"],
  ["g2_review_measure", "Bài 35. Ôn tập đo lường", "Ôn tập học kì 1", "Ôn tập kg, lít và đo lường cơ bản.", "estimate"],
  ["g2_review_hk1", "Bài 36. Ôn tập chung", "Ôn tập học kì 1", "Ôn tập tổng hợp học kì 1.", "concept"],
  ["g2_multiplication", "Bài 37. Phép nhân", "Phép nhân, phép chia", "Hiểu phép nhân là cộng các số hạng bằng nhau.", "arithmetic"],
  ["g2_factors_product", "Bài 38. Thừa số, tích", "Phép nhân, phép chia", "Gọi đúng thừa số và tích trong phép nhân.", "arithmetic"],
  ["g2_table_2", "Bài 39. Bảng nhân 2", "Phép nhân, phép chia", "Thuộc bảng nhân 2.", "arithmetic"],
  ["g2_table_5", "Bài 40. Bảng nhân 5", "Phép nhân, phép chia", "Thuộc bảng nhân 5.", "arithmetic"],
  ["g2_division", "Bài 41. Phép chia", "Phép nhân, phép chia", "Hiểu phép chia là phép ngược của phép nhân.", "arithmetic"],
  ["g2_dividend_divisor", "Bài 42. Số bị chia, số chia, thương", "Phép nhân, phép chia", "Gọi đúng số bị chia, số chia, thương.", "arithmetic"],
  ["g2_div_table_2", "Bài 43. Bảng chia 2", "Phép nhân, phép chia", "Thuộc bảng chia 2.", "arithmetic"],
  ["g2_div_table_5", "Bài 44. Bảng chia 5", "Phép nhân, phép chia", "Thuộc bảng chia 5.", "arithmetic"],
  ["g2_practice_ch8", "Bài 45. Luyện tập chung", "Phép nhân, phép chia", "Củng cố nhân, chia và bảng nhân, chia 2, 5.", "arithmetic"],
  ["g2_cylinder_sphere", "Bài 46. Khối trụ, khối cầu", "Làm quen với hình khối", "Nhận biết khối trụ và khối cầu.", "solid"],
  ["g2_practice_ch9", "Bài 47. Luyện tập chung", "Làm quen với hình khối", "Củng cố khối trụ và khối cầu.", "solid"],
  ["g2_place_1000", "Bài 48. Đơn vị, chục, trăm, nghìn", "Các số trong phạm vi 1000", "Nhận biết hàng đơn vị, chục, trăm, nghìn.", "place"],
  ["g2_round_numbers", "Bài 49. Các số tròn trăm, tròn chục", "Các số trong phạm vi 1000", "Đọc, viết số tròn trăm, tròn chục.", "place"],
  ["g2_compare_round", "Bài 50. So sánh các số tròn trăm, tròn chục", "Các số trong phạm vi 1000", "So sánh số tròn trăm, tròn chục.", "numberLine"],
  ["g2_three_digit", "Bài 51. Số có ba chữ số", "Các số trong phạm vi 1000", "Đọc, viết số có ba chữ số.", "place"],
  ["g2_expanded_form", "Bài 52. Viết số thành tổng các trăm, chục, đơn vị", "Các số trong phạm vi 1000", "Phân tích số thành tổng trăm, chục, đơn vị.", "place"],
  ["g2_compare_3d", "Bài 53. So sánh các số có ba chữ số", "Các số trong phạm vi 1000", "So sánh số có ba chữ số từ hàng cao đến thấp.", "numberLine"],
  ["g2_practice_ch10", "Bài 54. Luyện tập chung", "Các số trong phạm vi 1000", "Củng cố số trong phạm vi 1000.", "place"],
  ["g2_length_units", "Bài 55. Đề-xi-mét. Mét. Ki-lô-mét", "Độ dài và đơn vị đo độ dài. Tiền Việt Nam", "Làm quen dm, m, km và quan hệ giữa chúng.", "estimate"],
  ["g2_vnd_money", "Bài 56. Giới thiệu tiền Việt Nam", "Độ dài và đơn vị đo độ dài. Tiền Việt Nam", "Nhận biết các loại tiền Việt Nam và tính tiền đơn giản.", "concept"],
  ["g2_length_exp", "Bài 57. Thực hành và trải nghiệm đo độ dài", "Độ dài và đơn vị đo độ dài. Tiền Việt Nam", "Thực hành đo độ dài bằng dm, m.", "estimate"],
  ["g2_practice_ch11", "Bài 58. Luyện tập chung", "Độ dài và đơn vị đo độ dài. Tiền Việt Nam", "Củng cố đo độ dài và tiền Việt Nam.", "estimate"],
  ["g2_add_1000_no_carry", "Bài 59. Phép cộng (không nhớ) trong phạm vi 1000", "Phép cộng, phép trừ trong phạm vi 1000", "Cộng số có ba chữ số không nhớ.", "arithmetic"],
  ["g2_add_1000_carry", "Bài 60. Phép cộng (có nhớ) trong phạm vi 1000", "Phép cộng, phép trừ trong phạm vi 1000", "Cộng số có ba chữ số có nhớ.", "arithmetic"],
  ["g2_sub_1000_no_borrow", "Bài 61. Phép trừ (không nhớ) trong phạm vi 1000", "Phép cộng, phép trừ trong phạm vi 1000", "Trừ số có ba chữ số không nhớ.", "arithmetic"],
  ["g2_sub_1000_borrow", "Bài 62. Phép trừ (có nhớ) trong phạm vi 1000", "Phép cộng, phép trừ trong phạm vi 1000", "Trừ số có ba chữ số có nhớ.", "arithmetic"],
  ["g2_practice_ch12", "Bài 63. Luyện tập chung", "Phép cộng, phép trừ trong phạm vi 1000", "Củng cố cộng, trừ trong phạm vi 1000.", "arithmetic"],
  ["g2_data_collect", "Bài 64. Thu thập, phân loại, kiểm đếm số liệu", "Làm quen với yếu tố thống kê, xác suất", "Thu thập, phân loại và đếm số liệu.", "data"],
  ["g2_pictograph", "Bài 65. Biểu đồ tranh", "Làm quen với yếu tố thống kê, xác suất", "Đọc và hiểu biểu đồ tranh.", "chart"],
  ["g2_probability", "Bài 66. Chắc chắn, có thể, không thể", "Làm quen với yếu tố thống kê, xác suất", "Phân biệt sự kiện chắc chắn, có thể, không thể.", "probability"],
  ["g2_data_exp", "Bài 67. Thực hành và trải nghiệm thu thập, phân loại, kiểm đếm số liệu", "Làm quen với yếu tố thống kê, xác suất", "Thực hành thu thập và phân loại số liệu.", "data"],
  ["g2_review_1000", "Bài 68. Ôn tập các số trong phạm vi 1000", "Ôn tập cuối năm", "Ôn tập đọc, viết, so sánh số đến 1000.", "place"],
  ["g2_review_ops_100", "Bài 69. Ôn tập phép cộng, phép trừ trong phạm vi 100", "Ôn tập cuối năm", "Ôn tập cộng, trừ có nhớ trong phạm vi 100.", "arithmetic"],
  ["g2_review_ops_1000", "Bài 70. Ôn tập phép cộng, phép trừ trong phạm vi 1000", "Ôn tập cuối năm", "Ôn tập cộng, trừ trong phạm vi 1000.", "arithmetic"],
  ["g2_review_mul_div", "Bài 71. Ôn tập phép nhân, phép chia", "Ôn tập cuối năm", "Ôn tập bảng nhân, chia 2 và 5.", "arithmetic"],
  ["g2_review_geo_final", "Bài 72. Ôn tập hình học", "Ôn tập cuối năm", "Ôn tập hình phẳng và hình khối.", "geometry"],
  ["g2_review_measure_final", "Bài 73. Ôn tập đo lường", "Ôn tập cuối năm", "Ôn tập kg, lít, dm, m, km và tiền.", "estimate"],
  ["g2_review_stats", "Bài 74. Ôn tập kiểm đếm số liệu và lựa chọn khả năng", "Ôn tập cuối năm", "Ôn tập thống kê và xác suất cơ bản.", "probability"],
  ["g2_review_final", "Bài 75. Ôn tập chung", "Ôn tập cuối năm", "Ôn tập tổng hợp cuối năm.", "concept"]
];

const chapters = [...new Set(grade2.map((lesson) => lesson[2]))];

const core = {
  g2_review_100: ["Số đến 100", "Đọc, viết, so sánh số có hai chữ số.", "67 > 52 vì 6 chục > 5 chục.", "So hàng chục trước, đơn vị sau."],
  g2_number_line: ["Tia số", "Số bên phải lớn hơn số bên trái trên tia số.", "Số liền sau 49 là 50.", "Số liền trước bé hơn 1 đơn vị."],
  g2_add_sub_parts: ["Thành phần phép tính", "Cộng: số hạng + số hạng = tổng; trừ: số bị trừ - số trừ = hiệu.", "Trong 8 + 5 = 13, 8 và 5 là số hạng.", "Gọi đúng tên từng số trong phép tính."],
  g2_how_many_more: ["Hơn kém bao nhiêu", "Hơn kém = hiệu của hai số.", "12 hơn 7 bao nhiêu? 12 - 7 = 5.", "Tìm hiệu, không cộng."],
  g2_review_add_sub_100: ["Cộng trừ không nhớ", "Cộng chục với chục, đơn vị với đơn vị.", "34 + 25 = 59.", "Không nhớ sang hàng chục."],
  g2_practice_ch1: ["Củng cố chương 1", "Kết hợp số, tia số và phép tính.", "Số liền trước 40 là 39.", "Đọc kỹ yêu cầu từng câu."],
  g2_add_over_10: ["Cộng qua 10", "Tách số để tạo 10 trước.", "8 + 5 = 8 + 2 + 3 = 13.", "8 + 2 = 10, còn 3."],
  g2_add_table_10: ["Bảng cộng qua 10", "Thuộc các cặp số tạo tổng 11–20.", "7 + 6 = 13; 9 + 4 = 13.", "Nhớ nhanh giúp tính đúng."],
  g2_add_story: ["Bài toán thêm bớt", "Thêm: cộng; bớt: trừ.", "Có 9 quả, thêm 4 quả: 9 + 4 = 13.", "Đọc từ khóa thêm, bớt."],
  g2_practice_ch2: ["Luyện cộng qua 10", "Cộng trong phạm vi 20 và bài toán.", "6 + 7 = 13.", "Kiểm tra bằng phép ngược."],
  g2_sub_over_10: ["Trừ qua 10", "Tách số trừ để trừ qua 10.", "13 - 5 = 13 - 3 - 2 = 10 - 2 = 8.", "Trừ từng phần qua 10."],
  g2_sub_table_10: ["Bảng trừ qua 10", "Trừ và cộng là phép ngược nhau.", "15 - 7 = 8 vì 8 + 7 = 15.", "Dùng bảng cộng để kiểm tra."],
  g2_more_less_story: ["Nhiều hơn, ít hơn", "Nhiều hơn: cộng thêm; ít hơn: trừ đi.", "Lan 14 tuổi, em kém Lan 3 tuổi: 14 - 3 = 11.", "Phân biệt nhiều hơn và hơn bao nhiêu."],
  g2_practice_ch2b: ["Tổng hợp phạm vi 20", "Cộng, trừ qua 10 và bài toán.", "18 - 9 = 9.", "Chọn phép tính theo lời bài."],
  g2_kilogram: ["Ki-lô-gam", "kg đo khối lượng nặng, nhẹ.", "Gói đường 1 kg nặng hơn gói 500 g.", "Viết tắt ki-lô-gam là kg."],
  g2_liter: ["Lít", "l đo dung tích chất lỏng.", "Can nước 2 l chứa nhiều hơn chai 1 l.", "Viết tắt lít là l."],
  g2_measure_exp: ["Đo thực tế", "Dùng cân và ca đo kg, l.", "Rót 1 l nước vào ca 1 l cho đầy.", "Chọn đơn vị phù hợp vật đo."],
  g2_practice_ch3: ["Củng cố đo lường", "So sánh khối lượng và dung tích.", "3 kg > 2 kg.", "Ghi đơn vị kg hoặc l."],
  g2_add_carry_2d1d: ["Cộng có nhớ", "Đơn vị ≥ 10 thì nhớ 1 sang chục.", "38 + 5 = 43 (8 + 5 = 13, nhớ 1).", "Ghi 3 đơn vị, nhớ 1 chục."],
  g2_add_carry_2d2d: ["Cộng hai số có nhớ", "Cộng đơn vị, nhớ sang chục; cộng chục kèm nhớ.", "47 + 28 = 75.", "Thẳng hàng chục và đơn vị."],
  g2_practice_ch4: ["Luyện cộng có nhớ", "Cộng trong phạm vi 100.", "56 + 27 = 83.", "Kiểm tra bằng phép trừ ngược."],
  g2_sub_borrow_2d1d: ["Trừ có nhớ", "Đơn vị không đủ trừ thì mượn 1 chục.", "42 - 7 = 35 (12 - 7 = 5).", "Mượn 1 chục = 10 đơn vị."],
  g2_sub_borrow_2d2d: ["Trừ hai số có nhớ", "Trừ đơn vị, mượn chục nếu cần.", "63 - 28 = 35.", "Đặt tính thẳng hàng."],
  g2_practice_ch4b: ["Cộng trừ có nhớ", "Củng cố phép tính trong phạm vi 100.", "91 - 46 = 45.", "Kiểm tra bằng phép ngược."],
  g2_points_lines: ["Điểm và đường", "Điểm: vị trí; đoạn thẳng: hai điểm và đoạn nối.", "Ba điểm thẳng hàng nằm trên một đường thẳng.", "Dùng thước kiểm tra thẳng hàng."],
  g2_broken_line_quad: ["Gấp khúc và tứ giác", "Đường gấp khúc gồm nhiều đoạn; tứ giác có 4 cạnh.", "Hình cửa sổ thường là tứ giác.", "Đếm số đoạn hoặc cạnh."],
  g2_fold_cut: ["Gấp cắt ghép", "Gấp giấy đối xứng để cắt hình.", "Gấp đôi giấy rồi cắt tạo hình đối xứng.", "Vẽ đoạn thẳng nối hai điểm."],
  g2_practice_ch5: ["Nhận dạng hình", "Gọi đúng tên hình phẳng.", "Đường gấp khúc ABCD có 3 đoạn.", "Quan sát số cạnh và đoạn."],
  g2_day_hour: ["Giờ và phút", "1 giờ = 60 phút; kim ngắn chỉ giờ, kim dài chỉ phút.", "2 giờ 30 phút: kim ngắn giữa 2 và 3.", "Đọc giờ trước, phút sau."],
  g2_day_month: ["Ngày và tháng", "Lịch ghi ngày, tháng trong năm.", "Ngày 15 tháng 3.", "Một năm có 12 tháng."],
  g2_clock_calendar_exp: ["Xem đồng hồ, lịch", "Thực hành đọc giờ và tìm ngày.", "Thứ Hai ngày 10 tháng 9.", "Kim ngắn chỉ giờ, kim dài chỉ phút."],
  g2_practice_ch6: ["Củng cố thời gian", "Kết hợp giờ, phút, ngày, tháng.", "3 giờ 15 phút.", "60 phút = 1 giờ."],
  g2_review_ops: ["Ôn cộng trừ", "Phạm vi 20 và 100.", "17 - 8 = 9; 73 + 18 = 91.", "Chọn phép tính phù hợp."],
  g2_review_geo: ["Ôn hình phẳng", "Điểm, đoạn, tứ giác, gấp khúc.", "Tứ giác có 4 cạnh.", "Phân biệt đoạn thẳng và đường thẳng."],
  g2_review_measure: ["Ôn đo lường", "kg, l và so sánh.", "2 l > 1 l; 5 kg > 3 kg.", "Ghi đúng đơn vị."],
  g2_review_hk1: ["Tổng hợp HK1", "Số, phép tính, hình, thời gian.", "9 + 6 = 15; 4 giờ chiều.", "Ôn từng chủ đề đã học."],
  g2_multiplication: ["Phép nhân", "Nhân là cộng lặp lại số hạng bằng nhau.", "3 × 4 = 4 + 4 + 4 = 12.", "3 × 4 nghĩa 3 nhóm, mỗi nhóm 4."],
  g2_factors_product: ["Thừa số và tích", "a × b = c: a, b là thừa số; c là tích.", "Trong 5 × 2 = 10, 10 là tích.", "Thứ tự thừa số không đổi tích."],
  g2_table_2: ["Bảng nhân 2", "Nhân 2 bằng cộng số đó với chính nó.", "2 × 7 = 14.", "Bảng nhân 2: 2, 4, 6, 8, 10..."],
  g2_table_5: ["Bảng nhân 5", "Tích với 5 kết thúc bằng 0 hoặc 5.", "5 × 6 = 30.", "Đếm thêm 5 mỗi lần."],
  g2_division: ["Phép chia", "Chia là phép ngược của nhân.", "12 : 3 = 4 vì 4 × 3 = 12.", "Chia thành các nhóm bằng nhau."],
  g2_dividend_divisor: ["Số bị chia, số chia", "a : b = c: a số bị chia, b số chia, c thương.", "Trong 15 : 5 = 3, 15 là số bị chia.", "Không chia cho 0."],
  g2_div_table_2: ["Bảng chia 2", "Chia 2 là tìm một nửa.", "14 : 2 = 7.", "Dùng bảng nhân 2 ngược lại."],
  g2_div_table_5: ["Bảng chia 5", "Chia 5 liên hệ bảng nhân 5.", "25 : 5 = 5.", "25 = 5 × 5."],
  g2_practice_ch8: ["Nhân chia tổng hợp", "Bảng nhân, chia 2 và 5.", "4 × 5 = 20; 20 : 4 = 5.", "Nhân và chia là phép ngược."],
  g2_cylinder_sphere: ["Khối trụ, khối cầu", "Khối trụ lăn được; khối cầu tròn mọi phía.", "Lon nước giống khối trụ; quả bóng giống khối cầu.", "Khối trụ có hai đáy tròn."],
  g2_practice_ch9: ["Nhận dạng khối", "Phân biệt khối trụ và khối cầu.", "Cột đèn tròn có thể là khối trụ.", "Khối cầu lăn mọi hướng."],
  g2_place_1000: ["Hàng đơn vị đến nghìn", "Số có ba chữ số: trăm, chục, đơn vị; 1000 = 1 nghìn.", "456: 4 trăm, 5 chục, 6 đơn vị.", "Chữ số trái là hàng cao hơn."],
  g2_round_numbers: ["Số tròn trăm, chục", "200, 350 là số tròn trăm hoặc tròn chục.", "300 = 3 trăm; 450 = 45 chục.", "Số tròn chục có chữ số đơn vị 0."],
  g2_compare_round: ["So sánh số tròn", "So hàng trăm trước, rồi chục.", "500 > 300; 240 > 230.", "Chữ số hàng cao quyết định."],
  g2_three_digit: ["Số ba chữ số", "Đọc theo trăm, chục, đơn vị.", "725 đọc: bảy trăm hai mươi lăm.", "0 ở hàng chục đọc linh."],
  g2_expanded_form: ["Tổng trăm chục đơn vị", "Phân tích số thành tổng các hàng.", "638 = 600 + 30 + 8.", "Mỗi hàng nhân hệ số 100, 10, 1."],
  g2_compare_3d: ["So sánh số 3 chữ số", "So từ hàng trăm, chục, đơn vị.", "589 > 582 vì 9 > 2 ở hàng đơn vị.", "Hàng bằng nhau thì so hàng thấp hơn."],
  g2_practice_ch10: ["Củng cố số 1000", "Đọc, viết, so sánh, phân tích số.", "999 + 1 = 1000.", "1000 có 1 ở hàng nghìn."],
  g2_length_units: ["dm, m, km", "1 m = 10 dm; 1 km = 1000 m.", "Quãng đường dài dùng km; bàn học dùng dm.", "Chọn đơn vị phù hợp độ dài."],
  g2_vnd_money: ["Tiền Việt Nam", "Nhận biết tờ tiền và tính tổng tiền.", "2 tờ 5000 đồng = 10 000 đồng.", "Cộng số tiền từng tờ."],
  g2_length_exp: ["Đo độ dài", "Dùng thước đo bằng dm, m.", "Bảng học dài khoảng 8 dm.", "Đặt vạch 0 trùng đầu vật."],
  g2_practice_ch11: ["Đo dài và tiền", "Quy đổi dm, m và tính tiền.", "1 m = 10 dm.", "Ghi đơn vị trong đáp số."],
  g2_add_1000_no_carry: ["Cộng không nhớ 1000", "Cộng từng hàng không vượt 9.", "234 + 152 = 386.", "Thẳng hàng trăm, chục, đơn vị."],
  g2_add_1000_carry: ["Cộng có nhớ 1000", "Nhớ sang hàng cao hơn khi tổng ≥ 10.", "468 + 175 = 643.", "Nhớ 1 sang hàng chục hoặc trăm."],
  g2_sub_1000_no_borrow: ["Trừ không nhớ 1000", "Trừ từng hàng đủ trừ.", "587 - 243 = 344.", "Số bị trừ phải lớn hơn số trừ."],
  g2_sub_1000_borrow: ["Trừ có nhớ 1000", "Mượn từ hàng cao hơn khi không đủ trừ.", "503 - 267 = 236.", "1 trăm = 10 chục; 1 chục = 10 đơn vị."],
  g2_practice_ch12: ["Cộng trừ 1000", "Củng cố phép tính ba chữ số.", "725 + 148 = 873.", "Kiểm tra bằng phép ngược."],
  g2_data_collect: ["Thu thập số liệu", "Ghi lại, phân loại và đếm.", "Đếm số bạn thích màu đỏ: 5 bạn.", "Ghi rõ tiêu chí phân loại."],
  g2_pictograph: ["Biểu đồ tranh", "Mỗi hình đại diện một số lượng.", "1 quả cam = 2 quả thật, 3 hình = 6 quả.", "Đọc chú thích mỗi hình."],
  g2_probability: ["Chắc chắn, có thể", "Chắc chắn: luôn xảy ra; không thể: không bao giờ.", "Mặt trời mọc buổi sáng: chắc chắn.", "Có thể: có khi xảy ra, có khi không."],
  g2_data_exp: ["Thực hành thống kê", "Tự thu thập và trình bày số liệu.", "Khảo sát màu yêu thích lớp.", "Đếm chính xác từng nhóm."],
  g2_review_1000: ["Ôn số 1000", "Đọc, viết, so sánh số ba chữ số.", "742 > 724.", "So từ hàng trăm."],
  g2_review_ops_100: ["Ôn cộng trừ 100", "Tính có nhớ trong phạm vi 100.", "85 - 37 = 48.", "Kiểm tra bằng phép ngược."],
  g2_review_ops_1000: ["Ôn cộng trừ 1000", "Tính ba chữ số có nhớ.", "609 - 384 = 225.", "Thẳng hàng khi đặt tính."],
  g2_review_mul_div: ["Ôn nhân chia", "Bảng nhân, chia 2 và 5.", "8 × 5 = 40; 35 : 5 = 7.", "Chia kiểm tra bằng nhân."],
  g2_review_geo_final: ["Ôn hình học", "Hình phẳng và khối trụ, cầu.", "Tứ giác 4 cạnh; quả bóng là khối cầu.", "Phân biệt phẳng và khối."],
  g2_review_measure_final: ["Ôn đo lường", "kg, l, dm, m, km, tiền.", "2 m = 20 dm.", "Chọn đơn vị phù hợp."],
  g2_review_stats: ["Ôn thống kê xác suất", "Đếm số liệu và khả năng.", "Tung xúc xắc ra 7: không thể.", "Đọc biểu đồ và chú thích."],
  g2_review_final: ["Ôn cuối năm", "Tổng hợp toàn bộ chương trình lớp 2.", "6 × 4 = 24; 456 + 328 = 784.", "Đọc kỹ đề trước khi trả lời."]
};

const questions = {
  g2_review_100: [["multiple_choice", "Số nào lớn nhất: 45, 52, 38?", ["52", "45", "38", "50"], "52", "5 chục > 4 chục."], ["input", "Số liền sau 99 là?", "100", "99 + 1 = 100."]],
  g2_number_line: [["input", "Số liền trước 50 là?", "49", "50 - 1 = 49."], ["multiple_choice", "Trên tia số, số bên phải so với số bên trái?", ["Lớn hơn", "Nhỏ hơn", "Bằng nhau"], "Lớn hơn", "Tia số tăng sang phải."]],
  g2_add_sub_parts: [["multiple_choice", "Trong 9 + 6 = 15, 15 gọi là?", ["Tổng", "Số hạng", "Hiệu", "Số trừ"], "Tổng", "Kết quả cộng là tổng."], ["input", "Trong 14 - 5 = 9, 5 gọi là gì?", "số trừ", "Số trừ là số bị lấy đi."]],
  g2_how_many_more: [["input", "15 hơn 8 bao nhiêu?", "7", "15 - 8 = 7."], ["multiple_choice", "10 kém 6 bao nhiêu?", ["4", "16", "6", "10"], "4", "10 - 6 = 4."]],
  g2_review_add_sub_100: [["input", "Tính 43 + 25.", "68", "3+5=8, 4+2=6."], ["multiple_choice", "78 - 35 = ?", ["43", "53", "42", "33"], "43", "8-5=3, 7-3=4."]],
  g2_practice_ch1: [["input", "Số liền sau 67?", "68", "67 + 1."], ["multiple_choice", "63 ___ 36", [">", "<", "="], ">", "6 chục > 3 chục."]],
  g2_add_over_10: [["input", "Tính 8 + 5.", "13", "8 + 2 + 3 = 13."], ["multiple_choice", "9 + 7 = ?", ["16", "15", "17", "14"], "16", "9 + 1 + 6 = 16."]],
  g2_add_table_10: [["input", "7 + 6 = ?", "13", "7 + 3 + 3 = 13."], ["multiple_choice", "8 + 9 = ?", ["17", "16", "18", "15"], "17", "8 + 2 + 7 = 17."]],
  g2_add_story: [["input", "Có 8 quả, thêm 5 quả. Tổng cộng?", "13", "8 + 5 = 13."], ["multiple_choice", "Có 14 bạn, bớt 6 bạn. Còn lại?", ["8", "20", "6", "9"], "8", "14 - 6 = 8."]],
  g2_practice_ch2: [["input", "6 + 9 = ?", "15", "6 + 4 + 5 = 15."], ["multiple_choice", "5 + 8 = ?", ["13", "12", "14", "15"], "13", "5 + 5 + 3 = 13."]],
  g2_sub_over_10: [["input", "Tính 13 - 5.", "8", "13 - 3 - 2 = 8."], ["multiple_choice", "16 - 9 = ?", ["7", "8", "6", "9"], "7", "16 - 6 - 3 = 7."]],
  g2_sub_table_10: [["input", "15 - 7 = ?", "8", "8 + 7 = 15."], ["multiple_choice", "18 - 9 = ?", ["9", "8", "10", "7"], "9", "9 + 9 = 18."]],
  g2_more_less_story: [["input", "An 12 tuổi, Bình nhiều hơn An 3 tuổi. Bình bao nhiêu tuổi?", "15", "12 + 3 = 15."], ["multiple_choice", "Lan 16 quả, Hoa ít hơn Lan 4 quả. Hoa có?", ["12", "20", "4", "16"], "12", "16 - 4 = 12."]],
  g2_practice_ch2b: [["input", "17 - 8 = ?", "9", "17 - 7 - 1 = 9."], ["multiple_choice", "9 + 8 = ?", ["17", "16", "18", "15"], "17", "9 + 1 + 7 = 17."]],
  g2_kilogram: [["multiple_choice", "Đơn vị đo khối lượng?", ["kg", "l", "m", "cm"], "kg", "kg đo nặng nhẹ."], ["input", "Viết tắt ki-lô-gam là gì?", "kg", "kilogram = kg."]],
  g2_liter: [["input", "Viết tắt lít là gì?", "l", "liter = l."], ["multiple_choice", "Can 3 l so với can 1 l?", ["Nhiều hơn", "Ít hơn", "Bằng nhau"], "Nhiều hơn", "3 > 1."]],
  g2_measure_exp: [["input", "Gói gạo 2 kg so với gói 5 kg: gói nào nặng hơn? (gõ số kg)", "5", "5 kg > 2 kg."], ["multiple_choice", "Đo nước trong chai dùng?", ["l", "kg", "m", "km"], "l", "l đo chất lỏng."]],
  g2_practice_ch3: [["multiple_choice", "4 kg ___ 7 kg", ["<", ">", "="], "<", "4 < 7."], ["input", "2 l + 3 l = ? l", "5", "2 + 3 = 5."]],
  g2_add_carry_2d1d: [["input", "38 + 5 = ?", "43", "8 + 5 = 13, nhớ 1."], ["multiple_choice", "47 + 8 = ?", ["55", "54", "56", "45"], "55", "7 + 8 = 15, nhớ 1."]],
  g2_add_carry_2d2d: [["input", "56 + 27 = ?", "83", "6+7=13, 5+2+1=8."], ["multiple_choice", "38 + 45 = ?", ["83", "73", "82", "93"], "83", "8+5=13, 3+4+1=8."]],
  g2_practice_ch4: [["input", "29 + 16 = ?", "45", "9+6=15, 2+1+1=4."], ["multiple_choice", "64 + 18 = ?", ["82", "72", "81", "83"], "82", "4+8=12, 6+1+1=8."]],
  g2_sub_borrow_2d1d: [["input", "42 - 7 = ?", "35", "12 - 7 = 5."], ["multiple_choice", "51 - 8 = ?", ["43", "44", "42", "53"], "43", "11 - 8 = 3."]],
  g2_sub_borrow_2d2d: [["input", "63 - 28 = ?", "35", "13-8=5, 5-2=3."], ["multiple_choice", "82 - 47 = ?", ["35", "45", "34", "36"], "35", "12-7=5, 7-4=3."]],
  g2_practice_ch4b: [["input", "91 - 46 = ?", "45", "11-6=5, 8-4=4."], ["multiple_choice", "70 - 35 = ?", ["35", "45", "34", "105"], "35", "10-5=5, 6-3=3."]],
  g2_points_lines: [["multiple_choice", "Hình gồm hai điểm và đoạn nối?", ["Đoạn thẳng", "Đường thẳng", "Đường cong", "Tứ giác"], "Đoạn thẳng", "Đoạn thẳng có hai đầu."], ["input", "Ba điểm nằm trên một đường thẳng gọi là gì?", "thẳng hàng", "Cùng nằm trên một đường."]],
  g2_broken_line_quad: [["input", "Hình tứ giác có mấy cạnh?", "4", "Tứ giác = 4 cạnh."], ["multiple_choice", "Đường gấp khúc gồm?", ["Nhiều đoạn thẳng", "Một đoạn", "Hai điểm", "Một đường cong"], "Nhiều đoạn thẳng", "Gấp khúc = nhiều đoạn."]],
  g2_fold_cut: [["multiple_choice", "Gấp đôi giấy rồi cắt tạo hình?", ["Đối xứng", "Không đối xứng", "Hình tròn", "Điểm"], "Đối xứng", "Hai nửa giống nhau."], ["input", "Vẽ đoạn thẳng cần mấy điểm?", "2", "Hai điểm đầu cuối."]],
  g2_practice_ch5: [["input", "Tứ giác có mấy góc?", "4", "4 cạnh, 4 góc."], ["multiple_choice", "Đoạn thẳng AB khác đường thẳng AB vì?", ["Đoạn có hai đầu", "Đoạn dài hơn", "Đoạn cong", "Đoạn không thẳng"], "Đoạn có hai đầu", "Đường thẳng kéo dài vô hạn."]],
  g2_day_hour: [["multiple_choice", "1 giờ = ? phút", ["60", "100", "30", "24"], "60", "60 phút = 1 giờ."], ["input", "Kim ngắn chỉ giờ hay phút?", "giờ", "Kim ngắn = giờ."]],
  g2_day_month: [["input", "Một năm có bao nhiêu tháng?", "12", "12 tháng trong năm."], ["multiple_choice", "Lịch dùng để xem?", ["Ngày tháng", "Cân nặng", "Độ dài", "Nhiệt độ"], "Ngày tháng", "Lịch ghi ngày tháng."]],
  g2_clock_calendar_exp: [["input", "Kim dài chỉ số 12, kim ngắn chỉ 4. Mấy giờ?", "4", "4 giờ đúng."], ["multiple_choice", "2 giờ 30 phút: kim ngắn ở đâu?", ["Giữa 2 và 3", "Ở số 2", "Ở số 3", "Ở số 12"], "Giữa 2 và 3", "30 phút = nửa giờ."]],
  g2_practice_ch6: [["input", "60 phút = ? giờ", "1", "60 phút = 1 giờ."], ["multiple_choice", "Ngày 20 tháng 5 đọc là?", ["Ngày hai mươi tháng năm", "Ngày năm tháng hai mươi", "Tháng năm ngày hai mươi"], "Ngày hai mươi tháng năm", "Đọc ngày trước tháng."]],
  g2_review_ops: [["input", "9 + 8 = ?", "17", "9 + 1 + 7 = 17."], ["multiple_choice", "73 + 18 = ?", ["91", "81", "90", "92"], "91", "3+8=11, 7+1+1=9."]],
  g2_review_geo: [["multiple_choice", "Hình có 4 cạnh?", ["Tứ giác", "Tam giác", "Đoạn thẳng", "Điểm"], "Tứ giác", "Tứ = 4."], ["input", "Đường gấp khúc ABC có mấy đoạn?", "2", "AB và BC: 2 đoạn."]],
  g2_review_measure: [["input", "5 kg so với 3 kg: nặng hơn hay nhẹ hơn? (gõ: nặng hơn hoặc nhẹ hơn)", "nặng hơn", "5 > 3."], ["multiple_choice", "3 l so với 1 l?", ["Nhiều hơn", "Ít hơn", "Bằng nhau"], "Nhiều hơn", "3 > 1."]],
  g2_review_hk1: [["input", "16 - 9 = ?", "7", "16 - 6 - 3 = 7."], ["multiple_choice", "Kim ngắn 7, kim dài 12: mấy giờ?", ["7 giờ", "12 giờ", "9 giờ", "5 giờ"], "7 giờ", "Kim ngắn chỉ giờ."]],
  g2_multiplication: [["multiple_choice", "3 × 4 nghĩa là?", ["3 nhóm, mỗi nhóm 4", "3 + 4", "3 - 4", "4 - 3"], "3 nhóm, mỗi nhóm 4", "Nhân = cộng lặp."], ["input", "2 × 5 = ?", "10", "5 + 5 = 10."]],
  g2_factors_product: [["input", "Trong 4 × 3 = 12, 12 gọi là gì?", "tích", "Kết quả nhân là tích."], ["multiple_choice", "Trong 6 × 2 = 12, 6 và 2 là?", ["Thừa số", "Tích", "Số hạng", "Thương"], "Thừa số", "Hai số nhân là thừa số."]],
  g2_table_2: [["input", "2 × 7 = ?", "14", "7 + 7 = 14."], ["multiple_choice", "2 × 9 = ?", ["18", "16", "19", "11"], "18", "9 + 9 = 18."]],
  g2_table_5: [["input", "5 × 6 = ?", "30", "Bảng nhân 5."], ["multiple_choice", "5 × 8 = ?", ["40", "35", "45", "13"], "40", "5 × 8 = 40."]],
  g2_division: [["multiple_choice", "12 : 3 = 4 vì?", ["4 × 3 = 12", "12 + 3 = 4", "12 - 3 = 4", "3 × 4 = 7"], "4 × 3 = 12", "Chia ngược nhân."], ["input", "15 : 3 = ?", "5", "5 × 3 = 15."]],
  g2_dividend_divisor: [["input", "Trong 20 : 4 = 5, 20 gọi là gì?", "số bị chia", "Số bị chia đứng trước dấu chia."], ["multiple_choice", "Trong 18 : 2 = 9, 9 là?", ["Thương", "Số chia", "Số bị chia", "Tích"], "Thương", "Kết quả chia là thương."]],
  g2_div_table_2: [["input", "14 : 2 = ?", "7", "7 × 2 = 14."], ["multiple_choice", "18 : 2 = ?", ["9", "8", "16", "20"], "9", "9 × 2 = 18."]],
  g2_div_table_5: [["input", "25 : 5 = ?", "5", "5 × 5 = 25."], ["multiple_choice", "35 : 5 = ?", ["7", "6", "30", "40"], "7", "7 × 5 = 35."]],
  g2_practice_ch8: [["input", "4 × 5 = ?", "20", "Bảng nhân 5."], ["multiple_choice", "20 : 4 = ?", ["5", "4", "16", "24"], "5", "5 × 4 = 20."]],
  g2_cylinder_sphere: [["multiple_choice", "Quả bóng giống hình khối nào?", ["Khối cầu", "Khối trụ", "Khối lập phương", "Tam giác"], "Khối cầu", "Bóng tròn mọi phía."], ["input", "Lon nước giống khối gì?", "trụ", "Lon có đáy tròn = khối trụ."]],
  g2_practice_ch9: [["input", "Khối cầu lăn được không? (gõ: có hoặc không)", "có", "Khối cầu lăn mọi hướng."], ["multiple_choice", "Khối trụ có mấy đáy tròn?", ["2", "1", "0", "6"], "2", "Hai đáy tròn song song."]],
  g2_place_1000: [["multiple_choice", "456 có mấy trăm?", ["4", "5", "6", "456"], "4", "4 trăm 5 chục 6 đơn vị."], ["input", "Viết số: ba trăm linh năm.", "305", "3 trăm, 0 chục, 5 đơn vị."]],
  g2_round_numbers: [["input", "700 gồm mấy trăm?", "7", "7 trăm."], ["multiple_choice", "Số tròn chục nào?", ["350", "355", "353", "351"], "350", "Chữ số đơn vị là 0."]],
  g2_compare_round: [["input", "500 ___ 300 (điền >, < hoặc =)", ">", "5 trăm > 3 trăm."], ["multiple_choice", "240 ___ 230", [">", "<", "="], ">", "4 chục > 3 chục."]],
  g2_three_digit: [["multiple_choice", "725 đọc là?", ["Bảy trăm hai mươi lăm", "Bảy trăm năm mươi hai", "Hai trăm bảy mươi lăm"], "Bảy trăm hai mươi lăm", "7 trăm, 2 chục, 5 đơn vị."], ["input", "Viết số: sáu trăm mười tám.", "618", "6 trăm 1 chục 8 đơn vị."]],
  g2_expanded_form: [["input", "638 = 600 + ? + 8", "30", "6 trăm 3 chục 8 đơn vị."], ["multiple_choice", "405 = ?", ["400 + 5", "40 + 5", "400 + 50", "4 + 5"], "400 + 5", "0 chục nên 400 + 5."]],
  g2_compare_3d: [["input", "589 ___ 582 (điền >, < hoặc =)", ">", "9 > 2 ở hàng đơn vị."], ["multiple_choice", "Số lớn nhất: 456, 465, 446?", ["465", "456", "446", "464"], "465", "6 chục lớn nhất."]],
  g2_practice_ch10: [["input", "999 + 1 = ?", "1000", "Số liền sau 999."], ["multiple_choice", "742 gồm?", ["7 trăm 4 chục 2 đơn vị", "7 chục 4 trăm 2 đơn vị", "74 trăm 2 đơn vị"], "7 trăm 4 chục 2 đơn vị", "Đọc từ trái sang."]],
  g2_length_units: [["multiple_choice", "1 m = ? dm", ["10", "100", "1000", "1"], "10", "1 m = 10 dm."], ["input", "1 km = ? m", "1000", "1 km = 1000 m."]],
  g2_vnd_money: [["input", "2 tờ 5000 đồng = ? đồng", "10000", "5000 + 5000."], ["multiple_choice", "Tờ tiền nào có giá trị lớn nhất?", ["10000", "1000", "2000", "5000"], "10000", "10 000 lớn nhất."]],
  g2_length_exp: [["input", "1 m = ? dm", "10", "1 m = 10 dm."], ["multiple_choice", "Đo chiều dài bàn học nên dùng?", ["dm hoặc m", "kg", "l", "km"], "dm hoặc m", "Bàn không quá dài."]],
  g2_practice_ch11: [["input", "5 m = ? dm", "50", "5 × 10."], ["multiple_choice", "Quãng đường Hà Nội - TP.HCM đo bằng?", ["km", "m", "dm", "cm"], "km", "Quãng đường rất dài."]],
  g2_add_1000_no_carry: [["input", "234 + 152 = ?", "386", "4+2=6, 3+5=8, 2+1=3."], ["multiple_choice", "405 + 123 = ?", ["528", "518", "538", "427"], "528", "Cộng từng hàng."]],
  g2_add_1000_carry: [["input", "468 + 175 = ?", "643", "8+5=13, 6+7+1=14, 4+1+1=6."], ["multiple_choice", "356 + 278 = ?", ["634", "624", "534", "644"], "634", "6+8=14, 5+7+1=13, 3+2+1=6."]],
  g2_sub_1000_no_borrow: [["input", "587 - 243 = ?", "344", "7-3=4, 8-4=4, 5-2=3."], ["multiple_choice", "799 - 355 = ?", ["444", "454", "434", "544"], "444", "Trừ từng hàng."]],
  g2_sub_1000_borrow: [["input", "503 - 267 = ?", "236", "13-7=6, 9-6=3, 4-2=2."], ["multiple_choice", "600 - 458 = ?", ["142", "152", "242", "132"], "142", "Mượn từ hàng trăm."]],
  g2_practice_ch12: [["input", "725 + 148 = ?", "873", "5+8=13, 2+4+1=7, 7+1=8."], ["multiple_choice", "812 - 375 = ?", ["437", "447", "537", "427"], "437", "Trừ có nhớ."]],
  g2_data_collect: [["multiple_choice", "Thu thập số liệu là?", ["Ghi lại thông tin đếm được", "Vẽ hình tròn", "Tính cộng", "Đo độ dài"], "Ghi lại thông tin đếm được", "Đếm và ghi lại."], ["input", "5 bạn thích đỏ, 3 bạn thích xanh. Tổng bao nhiêu bạn?", "8", "5 + 3 = 8."]],
  g2_pictograph: [["input", "Biểu đồ: 1 hình = 2 quả, 4 hình = ? quả", "8", "4 × 2 = 8."], ["multiple_choice", "Biểu đồ tranh dùng để?", ["Biểu diễn số liệu bằng hình", "Tính diện tích", "Vẽ đoạn thẳng", "Đo thời gian"], "Biểu diễn số liệu bằng hình", "Mỗi hình = số lượng."]],
  g2_probability: [["multiple_choice", "Mặt trời mọc buổi sáng là?", ["Chắc chắn", "Có thể", "Không thể"], "Chắc chắn", "Luôn xảy ra mỗi ngày."], ["input", "Tung xúc xắc ra số 7: chắc chắn, có thể hay không thể?", "không thể", "Xúc xắc chỉ có 1-6."]],
  g2_data_exp: [["input", "Đếm 6 bạn thích bóng đá, 4 bạn thích cầu lông. Tổng?", "10", "6 + 4 = 10."], ["multiple_choice", "Phân loại số liệu theo?", ["Tiêu chí chung", "Màu bút", "Độ dài", "Thời gian"], "Tiêu chí chung", "Nhóm theo đặc điểm."]],
  g2_review_1000: [["input", "742 ___ 724 (điền >, < hoặc =)", ">", "4 chục > 2 chục."], ["multiple_choice", "Số lớn nhất: 589, 598, 859?", ["859", "598", "589", "895"], "859", "8 trăm lớn nhất."]],
  g2_review_ops_100: [["input", "85 - 37 = ?", "48", "15-7=8, 7-3=4."], ["multiple_choice", "46 + 38 = ?", ["84", "74", "83", "85"], "84", "6+8=14, 4+3+1=8."]],
  g2_review_ops_1000: [["input", "609 - 384 = ?", "225", "Trừ có nhớ."], ["multiple_choice", "456 + 328 = ?", ["784", "674", "774", "684"], "784", "6+8=14, 5+2+1=8, 4+3=7."]],
  g2_review_mul_div: [["input", "8 × 5 = ?", "40", "Bảng nhân 5."], ["multiple_choice", "35 : 5 = ?", ["7", "6", "30", "40"], "7", "7 × 5 = 35."]],
  g2_review_geo_final: [["multiple_choice", "Hình có thể lăn mọi hướng?", ["Khối cầu", "Khối trụ", "Tứ giác", "Đoạn thẳng"], "Khối cầu", "Cầu tròn đều."], ["input", "Tứ giác có mấy cạnh?", "4", "Tứ = 4."]],
  g2_review_measure_final: [["input", "2 m = ? dm", "20", "2 × 10."], ["multiple_choice", "Đo khối lượng gói muối dùng?", ["kg", "m", "km", "l"], "kg", "Muối có khối lượng."]],
  g2_review_stats: [["input", "Tung đồng xu, ra mặt ngửa: chắc chắn, có thể hay không thể?", "có thể", "Có thể ngửa hoặc sấp."], ["multiple_choice", "Biểu đồ tranh cần đọc?", ["Chú thích mỗi hình", "Màu bút", "Chiều dài cạnh", "Số giờ"], "Chú thích mỗi hình", "Biết 1 hình = bao nhiêu."]],
  g2_review_final: [["input", "6 × 4 = ?", "24", "6 + 6 + 6 + 6 = 24."], ["multiple_choice", "456 + 328 = ?", ["784", "674", "774", "684"], "784", "Cộng có nhớ."]]
};

const errorPatterns = [
  ["g2_how_many_more", "23", "more_less_add_error", "Cộng thay vì trừ", "15 hơn 8 bao nhiêu: 15 - 8 = 7, không phải 15 + 8.", "Hơn kém bao nhiêu = hiệu hai số."],
  ["g2_add_over_10", "85", "add_over10_error", "Chưa tách qua 10", "8 + 5 = 8 + 2 + 3 = 13, không phải 85.", "Tạo 10 trước rồi cộng phần còn."],
  ["g2_sub_over_10", "7", "sub_over10_error", "Trừ ngược", "13 - 5 = 8, không phải 5 - 13.", "Lấy số lớn trừ số nhỏ."],
  ["g2_more_less_story", "13", "more_less_story_error", "Nhầm nhiều hơn và hơn bao nhiêu", "Nhiều hơn 3 tuổi: cộng; kém 3 tuổi: trừ.", "Đọc kỹ nhiều hơn hay ít hơn."],
  ["g2_kilogram", "l", "mass_unit_error", "Nhầm kg và l", "Khối lượng dùng kg, không phải l.", "kg đo nặng; l đo chất lỏng."],
  ["g2_add_carry_2d2d", "713", "carry_add_error", "Quên nhớ sang chục", "38 + 45 = 83, không phải 73.", "Đơn vị ≥ 10 thì nhớ 1 chục."],
  ["g2_sub_borrow_2d2d", "55", "borrow_sub_error", "Quên mượn chục", "63 - 28 = 35, không phải 45.", "Mượn 1 chục = 10 đơn vị."],
  ["g2_day_hour", "12", "clock_hand_error", "Nhầm kim giờ và phút", "Kim ngắn chỉ giờ, kim dài chỉ phút.", "4 giờ: kim ngắn ở 4."],
  ["g2_multiplication", "7", "multiply_as_add_error", "Cộng thay vì nhân", "3 × 4 = 12, không phải 3 + 4 = 7.", "Nhân là cộng lặp số hạng bằng nhau."],
  ["g2_division", "45", "divide_reverse_error", "Chia ngược", "15 : 3 = 5, không phải 3 : 15.", "Số bị chia đứng trước dấu chia."],
  ["g2_compare_3d", "582", "three_digit_compare_error", "So từ hàng đơn vị trước", "589 > 582 vì so hàng trăm trước.", "So từ hàng cao đến thấp."],
  ["g2_length_units", "100", "length_unit_error", "Nhầm m và dm", "1 m = 10 dm, không phải 100 dm.", "Nhân 10 khi đổi m sang dm."],
  ["g2_pictograph", "4", "pictograph_error", "Quên nhân với chú thích", "4 hình × 2 = 8 quả, không phải 4.", "Đọc chú thích mỗi hình."],
  ["g2_probability", "chắc chắn", "probability_error", "Nhầm có thể và chắc chắn", "Tung xúc xắc ra 7: không thể.", "Chắc chắn luôn đúng; không thể không bao giờ."]
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
    grade: 2,
    book: index < 36 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo: index + 1,
    domain: chapter,
    level: index < 25 ? 1 : index < 50 ? 2 : 3,
    prerequisite: index === 0 ? [] : [grade2[index - 1][0]],
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

function stripGrade2(items) {
  return items.filter((item) => {
    if (item.grade === 2) return false;
    const skillId = item.skill || item.id;
    return !(typeof skillId === "string" && skillId.startsWith("g2_"));
  });
}

const existingSkills = stripGrade2(await readJson(files.skills));
const existingLessons = stripGrade2(await readJson(files.lessons));
const existingQuestions = stripGrade2(await readJson(files.questions));
const existingErrors = stripGrade2(await readJson(files.errors));

const nextSkills = grade2.map(makeSkill);
const nextLessons = grade2.map(makeLesson);
const nextQuestions = grade2.flatMap(([id]) => makeQuestions(id));
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

console.log(`Added ${nextSkills.length} grade 2 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);


