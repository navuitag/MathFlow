import { readFile, writeFile } from "node:fs/promises";
import { makeKeypointsStepFromCore } from "./lesson-keypoints.mjs";

const files = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const SOURCE = "Bám sát SGK Toán 4 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.";

const grade4 = [
  ["g4_review_100000", "Bài 1. Ôn tập các số đến 100 000", "Ôn tập và bổ sung", "Ôn tập đọc, viết, so sánh số trong phạm vi 100 000.", "place"],
  ["g4_add_sub_review_100000", "Bài 2. Ôn tập các phép tính trong phạm vi 100 000", "Ôn tập và bổ sung", "Ôn tập cộng, trừ, nhân, chia trong phạm vi 100 000.", "arithmetic"],
  ["g4_even_odd", "Bài 3. Số chẵn, số lẻ", "Ôn tập và bổ sung", "Nhận biết số chẵn, số lẻ và tính chất của chúng.", "numberLine"],
  ["g4_algebra_expression", "Bài 4. Biểu thức chứa chữ", "Ôn tập và bổ sung", "Giá trị biểu thức khi biết giá trị chữ; tìm giá trị chữ thỏa điều kiện.", "algebra"],
  ["g4_three_step", "Bài 5. Giải bài toán có ba bước tính", "Ôn tập và bổ sung", "Giải bài toán cần ba phép tính liên tiếp.", "concept"],
  ["g4_practice_ch1", "Bài 6. Luyện tập chung", "Ôn tập và bổ sung", "Củng cố số đến 100 000, biểu thức chữ và bài toán nhiều bước.", "place"],
  ["g4_angle_measure", "Bài 7. Đo góc, đơn vị đo góc", "Góc và đơn vị đo góc", "Đo góc bằng êke, thước đo góc; đơn vị độ.", "angle"],
  ["g4_angle_types", "Bài 8. Góc nhọn, góc tù, góc bẹt", "Góc và đơn vị đo góc", "Phân loại góc nhọn, vuông, tù, bẹt theo số đo.", "angle"],
  ["g4_practice_ch2", "Bài 9. Luyện tập chung", "Góc và đơn vị đo góc", "Củng cố đo góc và phân loại góc.", "angle"],
  ["g4_six_digit_million", "Bài 10. Số có sáu chữ số. Số 1 000 000", "Số có nhiều chữ số", "Đọc, viết số có sáu chữ số và số một triệu.", "place"],
  ["g4_place_value", "Bài 11. Hàng và lớp", "Số có nhiều chữ số", "Hàng đơn vị, chục, trăm; lớp đơn vị, nghìn, triệu.", "place"],
  ["g4_million_numbers", "Bài 12. Các số trong phạm vi lớp triệu", "Số có nhiều chữ số", "Đọc, viết, so sánh số đến lớp triệu.", "numberLine"],
  ["g4_round_hundred_thousand", "Bài 13. Làm tròn số đến hàng trăm nghìn", "Số có nhiều chữ số", "Làm tròn số đến hàng trăm nghìn.", "estimate"],
  ["g4_compare_large", "Bài 14. So sánh các số có nhiều chữ số", "Số có nhiều chữ số", "So sánh, sắp xếp số có nhiều chữ số.", "numberLine"],
  ["g4_natural_sequence", "Bài 15. Làm quen với dãy số tự nhiên", "Số có nhiều chữ số", "Nhận biết quy luật dãy số tự nhiên.", "numberLine"],
  ["g4_practice_ch3", "Bài 16. Luyện tập chung", "Số có nhiều chữ số", "Củng cố số lớn, làm tròn và dãy số.", "place"],
  ["g4_weight_units", "Bài 17. Yến, tạ, tấn", "Một số đơn vị đo đại lượng", "Quan hệ yến, tạ, tấn với ki-lô-gam.", "estimate"],
  ["g4_area_units", "Bài 18. Đề-xi-mét vuông, mét vuông, mi-li-mét vuông", "Một số đơn vị đo đại lượng", "Nhận biết dm², m², mm² và quy đổi.", "geometry"],
  ["g4_second_century", "Bài 19. Giây, thế kỉ", "Một số đơn vị đo đại lượng", "Giây trong đo thời gian; thế kỉ trong lịch sử.", "concept"],
  ["g4_measure_exp", "Bài 20. Thực hành và trải nghiệm sử dụng một số đơn vị đo đại lượng", "Một số đơn vị đo đại lượng", "Thực hành quy đổi và chọn đơn vị đo phù hợp.", "estimate"],
  ["g4_practice_ch4", "Bài 21. Luyện tập chung", "Một số đơn vị đo đại lượng", "Củng cố đơn vị khối lượng, diện tích, thời gian.", "estimate"],
  ["g4_add_large", "Bài 22. Phép cộng các số có nhiều chữ số", "Phép cộng và phép trừ", "Cộng các số có nhiều chữ số có nhớ.", "arithmetic"],
  ["g4_sub_large", "Bài 23. Phép trừ các số có nhiều chữ số", "Phép cộng và phép trừ", "Trừ các số có nhiều chữ số có mượn.", "arithmetic"],
  ["g4_add_properties", "Bài 24. Tính chất giao hoán và kết hợp của phép cộng", "Phép cộng và phép trừ", "Áp dụng giao hoán, kết hợp để tính nhanh.", "pemdas"],
  ["g4_sum_difference", "Bài 25. Tìm hai số khi biết tổng và hiệu của hai số đó", "Phép cộng và phép trừ", "Tìm hai số khi biết tổng và hiệu.", "algebra"],
  ["g4_practice_ch5", "Bài 26. Luyện tập chung", "Phép cộng và phép trừ", "Củng cố cộng, trừ số lớn và bài toán tổng hiệu.", "arithmetic"],
  ["g4_perpendicular", "Bài 27. Hai đường thẳng vuông góc", "Đường vuông góc. Đường thẳng song song", "Nhận biết hai đường thẳng vuông góc.", "geometry"],
  ["g4_perpendicular_draw", "Bài 28. Thực hành và trải nghiệm vẽ hai đường thẳng vuông góc", "Đường vuông góc. Đường thẳng song song", "Thực hành vẽ đường vuông góc bằng êke.", "geometry"],
  ["g4_parallel", "Bài 29. Hai đường thẳng song song", "Đường vuông góc. Đường thẳng song song", "Nhận biết hai đường thẳng song song.", "geometry"],
  ["g4_parallel_draw", "Bài 30. Thực hành và trải nghiệm vẽ hai đường thẳng song song", "Đường vuông góc. Đường thẳng song song", "Thực hành vẽ đường song song.", "geometry"],
  ["g4_parallelogram_rhombus", "Bài 31. Hình bình hành, hình thoi", "Đường vuông góc. Đường thẳng song song", "Nhận biết hình bình hành và hình thoi.", "triangle"],
  ["g4_practice_ch6", "Bài 32. Luyện tập chung", "Đường vuông góc. Đường thẳng song song", "Củng cố vuông góc, song song, bình hành, thoi.", "geometry"],
  ["g4_review_million", "Bài 33. Ôn tập các số đến lớp triệu", "Ôn tập học kì 1", "Ôn tập số đến lớp triệu và làm tròn.", "place"],
  ["g4_review_add_sub", "Bài 34. Ôn tập phép cộng, phép trừ", "Ôn tập học kì 1", "Ôn tập cộng, trừ số lớn.", "arithmetic"],
  ["g4_review_geo_hk1", "Bài 35. Ôn tập hình học", "Ôn tập học kì 1", "Ôn tập góc, vuông góc, song song, hình tứ giác.", "geometry"],
  ["g4_review_measure_hk1", "Bài 36. Ôn tập đo lường", "Ôn tập học kì 1", "Ôn tập đơn vị đo khối lượng, diện tích, thời gian.", "estimate"],
  ["g4_review_hk1", "Bài 37. Ôn tập chung", "Ôn tập học kì 1", "Ôn tập tổng hợp học kì 1.", "concept"],
  ["g4_mul_1d", "Bài 38. Nhân với số có một chữ số", "Phép nhân và phép chia", "Nhân số có nhiều chữ số với số có một chữ số.", "arithmetic"],
  ["g4_div_1d", "Bài 39. Chia cho số có một chữ số", "Phép nhân và phép chia", "Chia số có nhiều chữ số cho số có một chữ số.", "arithmetic"],
  ["g4_mul_properties", "Bài 40. Tính chất giao hoán và kết hợp của phép nhân", "Phép nhân và phép chia", "Áp dụng giao hoán, kết hợp phép nhân.", "pemdas"],
  ["g4_mul_div_powers10", "Bài 41. Nhân, chia với 10, 100, 1 000, …", "Phép nhân và phép chia", "Nhân, chia nhanh với 10, 100, 1000...", "arithmetic"],
  ["g4_distributive", "Bài 42. Tính chất phân phối của phép nhân đối với phép cộng", "Phép nhân và phép chia", "a × (b + c) = a × b + a × c.", "pemdas"],
  ["g4_mul_2d", "Bài 43. Nhân với số có hai chữ số", "Phép nhân và phép chia", "Nhân số có nhiều chữ số với số có hai chữ số.", "arithmetic"],
  ["g4_div_2d", "Bài 44. Chia cho số có hai chữ số", "Phép nhân và phép chia", "Chia số có nhiều chữ số cho số có hai chữ số.", "arithmetic"],
  ["g4_estimate_calc", "Bài 45. Thực hành và trải nghiệm ước lượng trong tính toán", "Phép nhân và phép chia", "Ước lượng kết quả trước khi tính chính xác.", "estimate"],
  ["g4_average", "Bài 46. Tìm số trung bình cộng", "Phép nhân và phép chia", "Số trung bình cộng = tổng : số lượng.", "ratio"],
  ["g4_unit_rate", "Bài 47. Bài toán liên quan đến rút về đơn vị", "Phép nhân và phép chia", "Rút về đơn vị rồi nhân hoặc chia tiếp.", "ratio"],
  ["g4_practice_ch8", "Bài 48. Luyện tập chung", "Phép nhân và phép chia", "Củng cố nhân, chia, trung bình và rút về đơn vị.", "arithmetic"],
  ["g4_data_sequence", "Bài 49. Dãy số liệu thống kê", "Làm quen với yếu tố thống kê, xác suất", "Đọc, phân tích dãy số liệu.", "data"],
  ["g4_bar_chart", "Bài 50. Biểu đồ cột", "Làm quen với yếu tố thống kê, xác suất", "Đọc và biểu diễn số liệu bằng biểu đồ cột.", "chart"],
  ["g4_event_frequency", "Bài 51. Số lần xuất hiện của một sự kiện", "Làm quen với yếu tố thống kê, xác suất", "Đếm số lần xuất hiện sự kiện trong thực nghiệm.", "probability"],
  ["g4_practice_ch9", "Bài 52. Luyện tập chung", "Làm quen với yếu tố thống kê, xác suất", "Củng cố dãy số liệu, biểu đồ và tần suất.", "chart"],
  ["g4_fraction_concept", "Bài 53. Khái niệm phân số", "Phân số", "Phân số a/b; tử số, mẫu số; phân số bằng nhau.", "fractionBar"],
  ["g4_fraction_division", "Bài 54. Phân số và phép chia số tự nhiên", "Phân số", "a : b = a/b với b khác 0.", "fractionBar"],
  ["g4_fraction_properties", "Bài 55. Tính chất cơ bản của phân số", "Phân số", "Nhân hoặc chia tử và mẫu với cùng số khác 0.", "fractionCompare"],
  ["g4_simplify_fraction", "Bài 56. Rút gọn phân số", "Phân số", "Chia tử và mẫu cho ước chung lớn nhất.", "fractionCompare"],
  ["g4_common_denominator", "Bài 57. Quy đồng mẫu số các phân số", "Phân số", "Quy đồng mẫu số để so sánh hoặc tính.", "fractionCompare"],
  ["g4_compare_fraction", "Bài 58. So sánh phân số", "Phân số", "So sánh phân số cùng mẫu hoặc quy đồng mẫu.", "fractionCompare"],
  ["g4_practice_ch10", "Bài 59. Luyện tập chung", "Phân số", "Củng cố khái niệm, rút gọn, quy đồng, so sánh phân số.", "fractionBar"],
  ["g4_add_fraction", "Bài 60. Phép cộng phân số", "Phép cộng, phép trừ phân số", "Cộng phân số cùng mẫu hoặc khác mẫu.", "fractionBar"],
  ["g4_sub_fraction", "Bài 61. Phép trừ phân số", "Phép cộng, phép trừ phân số", "Trừ phân số cùng mẫu hoặc khác mẫu.", "fractionBar"],
  ["g4_practice_ch11", "Bài 62. Luyện tập chung", "Phép cộng, phép trừ phân số", "Củng cố cộng, trừ phân số.", "fractionBar"],
  ["g4_mul_fraction", "Bài 63. Phép nhân phân số", "Phép nhân, phép chia phân số", "Nhân tử với tử, mẫu với mẫu.", "fractionBar"],
  ["g4_div_fraction", "Bài 64. Phép chia phân số", "Phép nhân, phép chia phân số", "Chia phân số bằng nhân với nghịch đảo.", "fractionBar"],
  ["g4_fraction_of_number", "Bài 65. Tìm phân số của một số", "Phép nhân, phép chia phân số", "a/b của n = n × a : b.", "fractionBar"],
  ["g4_practice_ch12", "Bài 66. Luyện tập chung", "Phép nhân, phép chia phân số", "Củng cố nhân, chia phân số và phân số của một số.", "fractionCompare"],
  ["g4_review_natural", "Bài 67. Ôn tập số tự nhiên", "Ôn tập cuối năm", "Ôn tập số đến lớp triệu, làm tròn, dãy số.", "place"],
  ["g4_review_natural_ops", "Bài 68. Ôn tập phép tính với số tự nhiên", "Ôn tập cuối năm", "Ôn tập cộng, trừ, nhân, chia số lớn.", "arithmetic"],
  ["g4_review_fraction", "Bài 69. Ôn tập phân số", "Ôn tập cuối năm", "Ôn tập khái niệm, rút gọn, so sánh phân số.", "fractionCompare"],
  ["g4_review_fraction_ops", "Bài 70. Ôn tập phép tính với phân số", "Ôn tập cuối năm", "Ôn tập cộng, trừ, nhân, chia phân số.", "fractionBar"],
  ["g4_review_geo_measure_final", "Bài 71. Ôn tập hình học và đo lường", "Ôn tập cuối năm", "Ôn tập góc, hình học và đơn vị đo.", "geometry"],
  ["g4_review_stats_final", "Bài 72. Ôn tập một số yếu tố thống kê và xác suất", "Ôn tập cuối năm", "Ôn tập dãy số liệu, biểu đồ, tần suất.", "probability"],
  ["g4_review_final", "Bài 73. Ôn tập chung", "Ôn tập cuối năm", "Ôn tập tổng hợp cuối năm lớp 4.", "concept"],
];

const chapters = [...new Set(grade4.map((lesson) => lesson[2]))];

const core = {
  g4_review_100000: ["Số đến 100 000", "Đọc, viết, so sánh số có năm chữ số.", "89 456 > 89 445 vì hàng chục 5 > 4.", "So từ hàng cao nhất."],
  g4_add_sub_review_100000: ["Phép tính 100 000", "Cộng, trừ, nhân, chia trong phạm vi 100 000.", "45 678 + 12 345 = 58 023.", "Kiểm tra bằng phép ngược."],
  g4_even_odd: ["Số chẵn, lẻ", "Số chẵn chia hết cho 2; số lẻ không chia hết cho 2.", "246 chẵn; 135 lẻ.", "Nhìn chữ số hàng đơn vị."],
  g4_algebra_expression: ["Biểu thức chữ", "Thay giá trị chữ vào biểu thức để tính.", "a + 5 khi a = 12 thì 17.", "Nhân trước khi cộng trong biểu thức."],
  g4_three_step: ["Ba bước tính", "Giải lần lượt ba phép tính theo đề.", "Mua 2 hộp, mỗi hộp 3 quyển, thêm 1: 2×3+1=7.", "Ghi kết quả từng bước."],
  g4_practice_ch1: ["Củng cố chương 1", "Số 100 000, chẵn lẻ, biểu thức chữ.", "x + 8 = 15 thì x = 7.", "Đọc kỹ yêu cầu từng câu."],
  g4_angle_measure: ["Đo góc", "Góc đo bằng độ (°); êke cho góc vuông.", "Góc vuông = 90°.", "Đặt tâm êke trùng đỉnh góc."],
  g4_angle_types: ["Loại góc", "Nhọn < 90°; vuông = 90°; tù > 90°; bẹt > 180°.", "Góc 120° là góc tù.", "So với 90° và 180°."],
  g4_practice_ch2: ["Củng cố góc", "Đo và phân loại góc.", "Góc 45° là góc nhọn.", "Dùng thước đo góc đọc số độ."],
  g4_six_digit_million: ["Số sáu chữ số", "Hàng trăm nghìn; 1 000 000 = một triệu.", "456 789: bốn trăm năm mươi sáu nghìn...", "999 999 + 1 = 1 000 000."],
  g4_place_value: ["Hàng và lớp", "Ba hàng một lớp: đơn vị, nghìn, triệu.", "Lớp triệu gồm triệu, chục triệu, trăm triệu.", "Mỗi hàng gấp 10 lần hàng bên phải."],
  g4_million_numbers: ["Lớp triệu", "Đọc, viết, so sánh số đến lớp triệu.", "2 345 678 < 2 346 000.", "So từ trái sang phải."],
  g4_round_hundred_thousand: ["Làm tròn", "Làm tròn đến hàng trăm nghìn.", "456 789 làm tròn hàng trăm nghìn là 500 000.", "Chữ số hàng chục nghìn ≥ 5 thì tăng."],
  g4_compare_large: ["So sánh số lớn", "So từ hàng cao nhất.", "1 200 000 > 1 199 999.", "Số chữ số nhiều hơn thì lớn hơn (cùng dạng)."],
  g4_natural_sequence: ["Dãy số", "Dãy có quy luật cộng hoặc nhân cố định.", "2, 5, 8, 11,... cộng thêm 3.", "Tìm hiệu hai số liền kề."],
  g4_practice_ch3: ["Củng cố số lớn", "Sáu chữ số, làm tròn, dãy số.", "10, 20, 30,... cộng 10.", "Xác định hàng làm tròn."],
  g4_weight_units: ["Yến, tạ, tấn", "1 tấn = 10 tạ = 100 yến = 1000 kg.", "2 tấn = 2000 kg.", "Chọn tấn cho vật rất nặng."],
  g4_area_units: ["Đơn vị diện tích", "1 m² = 100 dm² = 1 000 000 mm².", "Hình vuông cạnh 1 m có diện tích 1 m².", "Diện tích dùng đơn vị vuông."],
  g4_second_century: ["Giây, thế kỉ", "60 giây = 1 phút; 1 thế kỉ = 100 năm.", "Thế kỉ XXI: 2001-2100.", "Thế kỉ I: năm 1-100."],
  g4_measure_exp: ["Đo thực tế", "Quy đổi và chọn đơn vị phù hợp.", "3 tấn = 3000 kg.", "Ghi đơn vị trong đáp số."],
  g4_practice_ch4: ["Củng cố đo lường", "Tấn, m², giây, thế kỉ.", "5 tạ = 500 kg.", "Đổi cùng đơn vị trước khi tính."],
  g4_add_large: ["Cộng số lớn", "Cộng từng hàng, nhớ sang hàng cao.", "234 567 + 45 678 = 280 245.", "Thẳng hàng khi đặt tính."],
  g4_sub_large: ["Trừ số lớn", "Trừ từng hàng, mượn nếu cần.", "500 000 - 123 456 = 376 544.", "Kiểm tra bằng cộng."],
  g4_add_properties: ["Tính chất cộng", "a + b = b + a; (a + b) + c = a + (b + c).", "25 + 37 + 75 = (25 + 75) + 37 = 137.", "Nhóm số tạo tổng tròn để tính nhanh."],
  g4_sum_difference: ["Tổng và hiệu", "Số lớn = (tổng + hiệu) : 2; số bé = (tổng - hiệu) : 2.", "Tổng 50, hiệu 10: số lớn 30, số bé 20.", "Vẽ sơ đồ hai đoạn."],
  g4_practice_ch5: ["Củng cố cộng trừ", "Cộng, trừ số lớn; bài toán tổng hiệu.", "Tổng 100, hiệu 20: số lớn 60.", "Kiểm tra: lớn + bé = tổng."],
  g4_perpendicular: ["Vuông góc", "Hai đường thẳng vuông góc tạo góc vuông.", "Cạnh bàn và cạnh ghế vuông góc.", "Dùng êke kiểm tra."],
  g4_perpendicular_draw: ["Vẽ vuông góc", "Vẽ đường vuông góc qua một điểm.", "Dùng êke và thước thẳng.", "Vẽ nhẹ trước khi tô đậm."],
  g4_parallel: ["Song song", "Hai đường thẳng song song không giao.", "Cạnh đối của hình chữ nhật song song.", "Song song luôn cách nhau."],
  g4_parallel_draw: ["Vẽ song song", "Vẽ đường song song với đường cho trước.", "Dùng êke trượt dọc thước.", "Giữ khoảng cách cố định."],
  g4_parallelogram_rhombus: ["Bình hành, thoi", "Bình hành: cặp cạnh đối song song; thoi: bốn cạnh bằng.", "Hình thoi là hình bình hành đặc biệt.", "Thoi có hai cặp cạnh đối song song."],
  g4_practice_ch6: ["Củng cố hình HK1", "Vuông góc, song song, bình hành, thoi.", "Hình chữ nhật có 4 góc vuông.", "Phân biệt thoi và hình vuông."],
  g4_review_million: ["Ôn số triệu", "Đọc, viết, so sánh, làm tròn.", "3 450 000 làm tròn triệu là 3 000 000.", "Ôn từng chủ đề số."],
  g4_review_add_sub: ["Ôn cộng trừ", "Tính với số nhiều chữ số.", "1 000 000 - 1 = 999 999.", "Đặt tính thẳng hàng."],
  g4_review_geo_hk1: ["Ôn hình học", "Góc, vuông góc, song song, tứ giác.", "Hình bình hành có hai cặp cạnh đối song song.", "Vẽ hình minh họa khi giải."],
  g4_review_measure_hk1: ["Ôn đo lường", "Tấn, m², thế kỉ.", "1 tấn = 1000 kg.", "Chọn đơn vị phù hợp đề bài."],
  g4_review_hk1: ["Tổng hợp HK1", "Số, phép tính, hình, đo lường.", "Góc 90° là góc vuông.", "Đọc kỹ đề trước khi trả lời."],
  g4_mul_1d: ["Nhân một chữ số", "Nhân từng hàng, nhớ dần.", "12 345 × 6 = 74 070.", "Nhân hàng đơn vị trước."],
  g4_div_1d: ["Chia một chữ số", "Chia từng chữ số, nhân trừ lặp.", "84 000 : 7 = 12 000.", "Thương × số chia + dư = số bị chia."],
  g4_mul_properties: ["Tính chất nhân", "a × b = b × a; (a × b) × c = a × (b × c).", "4 × 25 × 7 = (4 × 25) × 7 = 700.", "Nhóm thừa số để nhân nhanh."],
  g4_mul_div_powers10: ["Nhân chia 10, 100...", "Nhân 10 thêm một chữ số 0; chia 10 bỏ một chữ số 0.", "450 × 100 = 45 000.", "Đếm số chữ số 0."],
  g4_distributive: ["Phân phối", "a × (b + c) = a × b + a × c.", "7 × 23 = 7 × 20 + 7 × 3 = 161.", "Tách tổng để nhân nhanh."],
  g4_mul_2d: ["Nhân hai chữ số", "Nhân từng chữ số của thừa số hai chữ số.", "234 × 12 = 2 808.", "Ghi từng dòng tích phụ."],
  g4_div_2d: ["Chia hai chữ số", "Ước thử thương từng chữ số.", "3 456 : 24 = 144.", "Nhân thử thương với số chia."],
  g4_estimate_calc: ["Ước lượng", "Làm tròn rồi tính nhẩm kiểm tra.", "198 × 21 ≈ 200 × 20 = 4 000.", "Ước lượng trước, tính chính xác sau."],
  g4_average: ["Trung bình cộng", "TBC = tổng các số : số lượng.", "Điểm 7, 8, 9 có TBC = 8.", "Cộng hết rồi chia."],
  g4_unit_rate: ["Rút về đơn vị", "Tìm giá trị một phần trước, nhân sau.", "5 kg giá 40 000 đ thì 3 kg: 8 000 × 3.", "Bước 1: một đơn vị; bước 2: nhân."],
  g4_practice_ch8: ["Củng cố nhân chia", "Nhân, chia, TBC, rút về đơn vị.", "TBC của 12, 15, 18 là 15.", "Chọn phép tính theo đề."],
  g4_data_sequence: ["Dãy số liệu", "Sắp xếp, tìm lớn nhất, nhỏ nhất, khoảng.", "12, 15, 9, 18: lớn nhất 18.", "Đọc từng số liệu cẩn thận."],
  g4_bar_chart: ["Biểu đồ cột", "Chiều cao cột thể hiện số liệu.", "Cột cao nhất là giá trị lớn nhất.", "Đọc thang chia trên trục."],
  g4_event_frequency: ["Tần suất", "Số lần sự kiện xảy ra trong các lần thử.", "Tung xu 20 lần, sấp 11 lần.", "Đếm chính xác từng lần."],
  g4_practice_ch9: ["Củng cố thống kê", "Dãy số liệu, biểu đồ, tần suất.", "Tổng 4 + 6 + 5 = 15 lần.", "Ghi tiêu đề biểu đồ rõ."],
  g4_fraction_concept: ["Khái niệm phân số", "a/b: a phần b phần bằng nhau.", "3/4: chia 4 phần, lấy 3.", "Mẫu số khác 0."],
  g4_fraction_division: ["Chia và phân số", "5 : 2 = 5/2.", "7 : 3 = 7/3.", "Thương có thể viết thành phân số."],
  g4_fraction_properties: ["Tính chất phân số", "Nhân hoặc chia tử, mẫu cùng số khác 0.", "2/3 = 4/6 = 8/12.", "Không chia cho 0."],
  g4_simplify_fraction: ["Rút gọn", "Chia tử và mẫu cho UCLN.", "8/12 = 2/3.", "Tìm ước chung lớn nhất."],
  g4_common_denominator: ["Quy đồng mẫu", "MSC là bội chung nhỏ nhất của các mẫu.", "1/2 và 1/3 quy đồng mẫu 6: 3/6 và 2/6.", "Nhân tử và mẫu cùng số."],
  g4_compare_fraction: ["So sánh phân số", "Cùng mẫu: so tử; khác mẫu: quy đồng.", "3/5 > 2/5.", "Cùng mẫu thì tử lớn hơn thì lớn hơn."],
  g4_practice_ch10: ["Củng cố phân số", "Rút gọn, quy đồng, so sánh.", "5/10 = 1/2.", "Vẽ hình chia phần minh họa."],
  g4_add_fraction: ["Cộng phân số", "Cùng mẫu: cộng tử, giữ mẫu.", "2/7 + 3/7 = 5/7.", "Quy đồng mẫu nếu khác mẫu."],
  g4_sub_fraction: ["Trừ phân số", "Cùng mẫu: trừ tử, giữ mẫu.", "5/6 - 1/6 = 4/6 = 2/3.", "Rút gọn kết quả nếu được."],
  g4_practice_ch11: ["Củng cố cộng trừ PS", "Cộng, trừ phân số.", "1/4 + 1/4 = 1/2.", "Mẫu chung trước khi tính."],
  g4_mul_fraction: ["Nhân phân số", "Tử × tử, mẫu × mẫu.", "2/3 × 4/5 = 8/15.", "Rút gọn trước hoặc sau khi nhân."],
  g4_div_fraction: ["Chia phân số", "Nhân với nghịch đảo.", "2/3 : 4/5 = 2/3 × 5/4 = 10/12.", "Đổi chia thành nhân nghịch đảo."],
  g4_fraction_of_number: ["Phân số của số", "2/5 của 30 = 30 × 2 : 5 = 12.", "3/4 của 20 = 15.", "Nhân số với tử rồi chia mẫu."],
  g4_practice_ch12: ["Củng cố PS tính toán", "Nhân, chia phân số.", "1/2 × 1/3 = 1/6.", "Kiểm tra bằng nhân ngược."],
  g4_review_natural: ["Ôn số tự nhiên", "Số lớn, làm tròn, dãy.", "2 500 000 > 2 499 999.", "So từ hàng cao."],
  g4_review_natural_ops: ["Ôn phép số TN", "Cộng, trừ, nhân, chia.", "15 000 × 4 = 60 000.", "Ước lượng kiểm tra."],
  g4_review_fraction: ["Ôn phân số", "Rút gọn, so sánh.", "3/4 > 2/4.", "Quy đồng khi khác mẫu."],
  g4_review_fraction_ops: ["Ôn tính PS", "Bốn phép với phân số.", "1/2 + 1/3 = 5/6.", "Mẫu chung là 6."],
  g4_review_geo_measure_final: ["Ôn hình đo", "Góc, song song, m², tấn.", "Góc bẹt > 180°.", "Ghi đúng đơn vị."],
  g4_review_stats_final: ["Ôn thống kê", "Biểu đồ, tần suất.", "Cột cao = số lớn.", "Đọc chú thích biểu đồ."],
  g4_review_final: ["Ôn cuối năm", "Tổng hợp lớp 4.", "2/5 của 40 = 16; TBC 6,8,10 = 8.", "Đọc kỹ đề trước khi trả lời."],
};

const questions = {
  g4_review_100000: [["multiple_choice", "Số 45 678 có mấy chữ số?", ["5", "4", "6", "3"], "5", "Đếm từ trái sang."], ["input", "Số liền sau 99 999 là?", "100000", "99 999 + 1 = 100 000."]],
  g4_add_sub_review_100000: [["input", "Tính 35 000 + 12 500.", "47500", "Cộng từng hàng."], ["multiple_choice", "80 000 - 25 000 = ?", ["55000", "105000", "50000", "65000"], "55000", "Trừ từng hàng."]],
  g4_even_odd: [["multiple_choice", "Số nào là số chẵn?", ["248", "135", "791", "503"], "248", "Chữ số hàng đơn vị chia hết cho 2."], ["input", "Số 1 024 là chẵn hay lẻ?", "chẵn", "Hàng đơn vị là 4."]],
  g4_algebra_expression: [["input", "Tính a + 7 khi a = 15.", "22", "15 + 7."], ["multiple_choice", "x - 4 = 10 thì x = ?", ["14", "6", "40", "4"], "14", "10 + 4 = 14."]],
  g4_three_step: [["input", "Mỗi hộp 4 quả, mua 3 hộp, ăn 2 quả. Còn bao nhiêu quả?", "10", "3×4-2=10."], ["multiple_choice", "Giải bài toán ba bước cần?", ["Ba phép tính theo thứ tự", "Một phép tính", "Bốn phép tính", "Không cần tính"], "Ba phép tính theo thứ tự", "Làm từng bước."]],
  g4_practice_ch1: [["input", "Số liền trước 50 000 là?", "49999", "50 000 - 1."], ["multiple_choice", "248 là số?", ["Chẵn", "Lẻ", "Không xác định", "Cả hai"], "Chẵn", "Chia hết cho 2."]],
  g4_angle_measure: [["input", "Góc vuông bằng bao nhiêu độ?", "90", "Góc vuông = 90°."], ["multiple_choice", "Đơn vị đo góc là?", ["Độ", "Ki-lô-mét", "Gam", "Giây"], "Độ", "Ký hiệu °."]],
  g4_angle_types: [["multiple_choice", "Góc 120° là góc gì?", ["Tù", "Nhọn", "Vuông", "Bẹt"], "Tù", "Lớn hơn 90° và nhỏ hơn 180°."], ["input", "Góc 45° là góc gì?", "nhọn", "Nhỏ hơn 90°."]],
  g4_practice_ch2: [["input", "Góc 180° gọi là góc gì?", "bẹt", "Bằng nửa vòng tròn."], ["multiple_choice", "Góc nhọn so với 90°?", ["Nhỏ hơn", "Bằng", "Lớn hơn", "Gấp đôi"], "Nhỏ hơn", "Góc nhọn < 90°."]],
  g4_six_digit_million: [["multiple_choice", "1 000 000 đọc là?", ["Một triệu", "Một nghìn", "Một trăm", "Mười triệu"], "Một triệu", "Sáu chữ số 0."], ["input", "Số liền sau 999 999 là?", "1000000", "999 999 + 1."]],
  g4_place_value: [["input", "Trong 3 456 789, chữ số 5 ở hàng nào?", "chục nghìn", "Hàng chục nghìn trong lớp nghìn."], ["multiple_choice", "Một lớp gồm mấy hàng?", ["3", "2", "4", "5"], "3", "Đơn vị, chục, trăm."]],
  g4_million_numbers: [["multiple_choice", "Số nào lớn nhất?", ["2 500 100", "2 499 999", "2 500 000", "2 490 000"], "2 500 100", "So từ hàng triệu."], ["input", "Viết số: hai triệu ba trăm nghìn.", "2300000", "2 300 000."]],
  g4_round_hundred_thousand: [["input", "456 789 làm tròn hàng trăm nghìn là?", "500000", "Hàng chục nghìn là 5 ≥ 5."], ["multiple_choice", "234 500 làm tròn hàng trăm nghìn?", ["200000", "300000", "235000", "230000"], "200000", "Hàng chục nghìn là 3 < 5."]],
  g4_compare_large: [["input", "Điền >, < hoặc =: 1 200 000 ___ 1 199 999", ">", "So hàng triệu."], ["multiple_choice", "Số bé nhất trong 3 400 000; 3 399 999; 3 410 000?", ["3399999", "3400000", "3410000", "3401000"], "3399999", "So từng hàng."]],
  g4_natural_sequence: [["multiple_choice", "Dãy 5, 10, 15, 20,... quy luật?", ["Cộng 5", "Nhân 2", "Cộng 10", "Trừ 5"], "Cộng 5", "Mỗi số hơn số trước 5."], ["input", "Dãy 2, 4, 8, 16,... số tiếp theo?", "32", "Nhân 2."]],
  g4_practice_ch3: [["input", "10, 20, 30, 40,... số tiếp theo?", "50", "Cộng 10."], ["multiple_choice", "1 500 000 làm tròn triệu là?", ["2000000", "1000000", "1500000", "1600000"], "2000000", "Hàng trăm nghìn là 5."]],
  g4_weight_units: [["multiple_choice", "1 tấn = ? kg", ["1000", "100", "10", "10000"], "1000", "1 tấn = 1000 kg."], ["input", "2 tấn = ? kg", "2000", "2 × 1000."]],
  g4_area_units: [["input", "1 m² = ? dm²", "100", "Mỗi cạnh gấp 10 lần."], ["multiple_choice", "1 dm² = ? cm²", ["100", "10", "1000", "10000"], "100", "1 dm = 10 cm."]],
  g4_second_century: [["multiple_choice", "1 thế kỉ = ? năm", ["100", "10", "1000", "50"], "100", "Một thế kỉ có 100 năm."], ["input", "60 giây = ? phút", "1", "60 giây = 1 phút."]],
  g4_measure_exp: [["input", "5 tạ = ? kg", "500", "1 tạ = 100 kg."], ["multiple_choice", "Đo diện tích phòng học nên dùng?", ["m2", "kg", "tấn", "giây"], "m2", "Diện tích dùng đơn vị vuông."]],
  g4_practice_ch4: [["input", "3 tấn = ? kg", "3000", "3 × 1000."], ["multiple_choice", "1 m² = ? mm²", ["1000000", "100", "1000", "10000"], "1000000", "10³ mỗi chiều."]],
  g4_add_large: [["input", "Tính 123 456 + 54 321.", "177777", "Cộng từng hàng."], ["multiple_choice", "234 567 + 100 000 = ?", ["334567", "234667", "235567", "134567"], "334567", "Cộng hàng trăm nghìn."]],
  g4_sub_large: [["input", "Tính 500 000 - 123 456.", "376544", "Trừ có mượn."], ["multiple_choice", "800 000 - 250 000 = ?", ["550000", "1050000", "500000", "650000"], "550000", "Trừ từng hàng."]],
  g4_add_properties: [["multiple_choice", "25 + 37 + 75 tính nhanh bằng?", ["(25+75)+37", "25+37+75+0", "37×3", "25×37"], "(25+75)+37", "Nhóm 25 và 75."], ["input", "4 + 9 + 6 + 1 = ? (nhóm 4+6 và 9+1)", "20", "10 + 10."]],
  g4_sum_difference: [["input", "Tổng 60, hiệu 10. Số lớn hơn?", "35", "(60+10):2=35."], ["multiple_choice", "Tổng 50, hiệu 6. Số bé?", ["22", "28", "25", "19"], "22", "(50-6):2=22."]],
  g4_practice_ch5: [["input", "Tổng 100, hiệu 20. Số lớn?", "60", "(100+20):2."], ["multiple_choice", "Tính chất giao hoán: a + b = ?", ["b + a", "a - b", "a × b", "a : b"], "b + a", "Đổi chỗ hai số hạng."]],
  g4_perpendicular: [["multiple_choice", "Hai đường vuông góc tạo góc?", ["Vuông", "Nhọn", "Tù", "Bẹt"], "Vuông", "Góc 90°."], ["input", "Góc giữa hai đường vuông góc là bao nhiêu độ?", "90", "Góc vuông."]],
  g4_perpendicular_draw: [["input", "Dụng cụ kiểm tra góc vuông?", "êke", "Êke có góc vuông."], ["multiple_choice", "Vẽ đường vuông góc qua điểm cần?", ["Êke và thước", "Compa", "Thước dây", "Cân"], "Êke và thước", "Dùng cạnh góc vuông êke."]],
  g4_parallel: [["multiple_choice", "Hai đường song song?", ["Không giao", "Vuông góc", "Cắt nhau", "Trùng nhau luôn"], "Không giao", "Trong mặt phẳng không cắt."], ["input", "Hình chữ nhật có mấy cặp cạnh song song?", "2", "Hai cặp cạnh đối."]],
  g4_parallel_draw: [["multiple_choice", "Vẽ đường song song dùng?", ["Êke trượt trên thước", "Compa", "Nhiệt kế", "Cân"], "Êke trượt trên thước", "Giữ khoảng cách cố định."], ["input", "Cạnh đối hình chữ nhật song song hay vuông góc?", "song song", "Cạnh đối không vuông góc."]],
  g4_parallelogram_rhombus: [["multiple_choice", "Hình thoi có mấy cạnh bằng nhau?", ["4", "2", "3", "6"], "4", "Bốn cạnh bằng nhau."], ["input", "Hình bình hành có cặp cạnh đối như thế nào?", "song song", "Hai cặp cạnh đối song song."]],
  g4_practice_ch6: [["input", "Hình vuông có phải hình thoi?", "có", "Bốn cạnh bằng nhau."], ["multiple_choice", "Hình bình hành có góc vuông chắc chắn là?", ["Hình chữ nhật", "Hình thoi", "Tam giác", "Tròn"], "Hình chữ nhật", "Bốn góc vuông."]],
  g4_review_million: [["multiple_choice", "Số nào lớn nhất?", ["3 500 000", "3 499 999", "3 050 000", "3 500 100"], "3 500 100", "So từng hàng."], ["input", "2 456 000 làm tròn triệu là?", "2000000", "Hàng trăm nghìn < 5."]],
  g4_review_add_sub: [["input", "1 000 000 - 1 = ?", "999999", "Số liền trước."], ["multiple_choice", "345 678 + 200 000 = ?", ["545678", "345878", "355678", "445678"], "545678", "Cộng hàng trăm nghìn."]],
  g4_review_geo_hk1: [["input", "Góc 90° gọi là góc gì?", "vuông", "Bằng góc vuông."], ["multiple_choice", "Hình thoi là hình?", ["Bình hành", "Tam giác", "Tròn", "Lập phương"], "Bình hành", "Có hai cặp cạnh đối song song."]],
  g4_review_measure_hk1: [["input", "1 tấn = ? yến", "100", "1 tấn = 100 yến."], ["multiple_choice", "1 m² = ? dm²", ["100", "10", "1000", "10000"], "100", "Quy đổi diện tích."]],
  g4_review_hk1: [["multiple_choice", "Tổng 80, hiệu 8. Số lớn?", ["44", "36", "40", "48"], "44", "(80+8):2."], ["input", "Góc nhọn < ? độ", "90", "Nhỏ hơn góc vuông."]],
  g4_mul_1d: [["input", "Tính 12 345 × 4.", "49380", "Nhân từng hàng."], ["multiple_choice", "5 000 × 6 = ?", ["30000", "3000", "56000", "11000"], "30000", "5 × 6 = 30, thêm 3 số 0."]],
  g4_div_1d: [["input", "Tính 84 000 : 7.", "12000", "Chia từng chữ số."], ["multiple_choice", "72 000 : 8 = ?", ["9000", "8000", "900", "90000"], "9000", "72 : 8 = 9."]],
  g4_mul_properties: [["multiple_choice", "4 × 25 × 2 tính nhanh?", ["200", "100", "50", "800"], "200", "(4×25)×2=100×2."], ["input", "7 × 5 = 5 × ?", "7", "Giao hoán."]],
  g4_mul_div_powers10: [["input", "450 × 100 = ?", "45000", "Thêm hai chữ số 0."], ["multiple_choice", "56 000 : 10 = ?", ["5600", "560", "56000", "560000"], "5600", "Bỏ một chữ số 0."]],
  g4_distributive: [["input", "6 × (10 + 3) = ?", "78", "6×10+6×3=78."], ["multiple_choice", "7 × 23 = 7 × 20 + 7 × ?", ["3", "20", "23", "7"], "3", "Phân phối."]],
  g4_mul_2d: [["input", "Tính 123 × 12.", "1476", "Nhân từng chữ số 12."], ["multiple_choice", "200 × 15 = ?", ["3000", "215", "300", "3500"], "3000", "2×15=30, thêm 2 số 0."]],
  g4_div_2d: [["input", "Tính 576 : 24.", "24", "24×24=576."], ["multiple_choice", "1 440 : 36 = ?", ["40", "4", "400", "50"], "40", "36×40=1440."]],
  g4_estimate_calc: [["multiple_choice", "198 × 21 ước lượng khoảng?", ["4000", "400", "40000", "2000"], "4000", "200×20."], ["input", "Ước lượng 503 + 298 khoảng?", "800", "500+300."]],
  g4_average: [["input", "TBC của 6, 8, 10?", "8", "(6+8+10):3=8."], ["multiple_choice", "TBC = ?", ["Tổng : số lượng", "Tổng × số lượng", "Tổng - số lượng", "Số lượng : tổng"], "Tổng : số lượng", "Cộng rồi chia."]],
  g4_unit_rate: [["input", "4 quyển 20 000 đ. 6 quyển giá bao nhiêu?", "30000", "5000×6."], ["multiple_choice", "Rút về đơn vị: bước 1?", ["Tìm giá trị 1 đơn vị", "Nhân tổng", "Cộng hết", "Chia tổng cho 0"], "Tìm giá trị 1 đơn vị", "Chia trước."]],
  g4_practice_ch8: [["input", "TBC 12, 15, 18?", "15", "45:3."], ["multiple_choice", "3 600 : 12 = ?", ["300", "30", "3000", "280"], "300", "36:12=3."]],
  g4_data_sequence: [["input", "Dãy 8, 12, 5, 15. Số lớn nhất?", "15", "So các số."], ["multiple_choice", "Dãy số liệu dùng để?", ["Phân tích thông tin số", "Vẽ góc", "Tính chu vi", "Rút gọn PS"], "Phân tích thông tin số", "Sắp xếp, so sánh."]],
  g4_bar_chart: [["multiple_choice", "Biểu đồ cột cao hơn nghĩa là?", ["Số liệu lớn hơn", "Ít hơn", "Bằng nhau", "Không đọc được"], "Số liệu lớn hơn", "Chiều cao cột."], ["input", "3 nhóm: 5, 8, 2. Tổng?", "15", "5+8+2."]],
  g4_event_frequency: [["input", "Tung xu 30 lần, sấp 13 lần. Số lần sấp?", "13", "Đếm kết quả."], ["multiple_choice", "Số lần xuất hiện gọi là?", ["Tần suất", "Chu vi", "Diện tích", "Tổng"], "Tần suất", "Đếm trong thực nghiệm."]],
  g4_practice_ch9: [["input", "Tung xúc xắc 20 lần, ra 6 được 4 lần. Số lần?", "4", "Đếm sự kiện."], ["multiple_choice", "Biểu đồ cột phù hợp?", ["So sánh số liệu các nhóm", "Đo góc", "Tính TBC", "Rút gọn PS"], "So sánh số liệu các nhóm", "Mỗi cột một nhóm."]],
  g4_fraction_concept: [["multiple_choice", "Phân số 3/5, mẫu số là?", ["5", "3", "8", "2"], "5", "Mẫu là số phần chia."], ["input", "Chia 8 phần bằng nhau, lấy 3. Viết PS?", "3/8", "3 trên 8."]],
  g4_fraction_division: [["input", "7 : 2 viết thành phân số?", "7/2", "Thương a:b = a/b."], ["multiple_choice", "12 : 4 = ?", ["3", "12/4", "4/12", "48"], "3", "Cũng bằng 12/4."]],
  g4_fraction_properties: [["multiple_choice", "2/3 = ?", ["4/6", "2/6", "3/4", "4/3"], "4/6", "Nhân tử mẫu với 2."], ["input", "Rút gọn 6/9.", "2/3", "Chia 3."]],
  g4_simplify_fraction: [["input", "Rút gọn 10/15.", "2/3", "Chia 5."], ["multiple_choice", "8/12 rút gọn?", ["2/3", "4/6", "8/12", "1/2"], "2/3", "UCLN là 4."]],
  g4_common_denominator: [["input", "Quy đồng 1/2 và 1/3, mẫu chung?", "6", "MSC của 2 và 3."], ["multiple_choice", "1/4 và 1/2 quy đồng mẫu 4: 1/4 và ?", ["2/4", "1/2", "3/4", "4/2"], "2/4", "1/2 = 2/4."]],
  g4_compare_fraction: [["multiple_choice", "3/5 và 2/5, phân số nào lớn?", ["3/5", "2/5", "Bằng nhau", "Không so được"], "3/5", "Cùng mẫu, so tử."], ["input", "1/2 và 1/4, phân số lớn hơn?", "1/2", "Một nửa lớn một phần tư."]],
  g4_practice_ch10: [["input", "So sánh 2/3 và 3/4 (quy đồng mẫu 12). Phân số lớn?", "3/4", "8/12 < 9/12."], ["multiple_choice", "5/10 = ?", ["1/2", "5/10", "10/5", "2/5"], "1/2", "Rút gọn."]],
  g4_add_fraction: [["input", "Tính 2/7 + 3/7.", "5/7", "Cùng mẫu, cộng tử."], ["multiple_choice", "1/4 + 1/4 = ?", ["1/2", "2/8", "1/8", "2/4"], "1/2", "2/4 = 1/2."]],
  g4_sub_fraction: [["input", "Tính 5/6 - 1/6.", "4/6", "Cùng mẫu."], ["multiple_choice", "3/4 - 1/4 = ?", ["1/2", "2/4", "4/4", "2/8"], "1/2", "2/4 = 1/2."]],
  g4_practice_ch11: [["input", "Tính 1/2 + 1/4 (mẫu chung 4).", "3/4", "2/4+1/4."], ["multiple_choice", "5/8 - 2/8 = ?", ["3/8", "3/0", "7/8", "5/6"], "3/8", "Trừ tử."]],
  g4_mul_fraction: [["input", "Tính 2/3 × 1/4.", "2/12", "Tử×tử, mẫu×mẫu."], ["multiple_choice", "1/2 × 2/3 = ?", ["1/3", "2/5", "3/2", "2/6"], "1/3", "2/6 = 1/3."]],
  g4_div_fraction: [["input", "2/3 : 1/3 = ?", "2", "Nhân nghịch đảo 1/3 là 3."], ["multiple_choice", "1/2 : 1/4 = ?", ["2", "1/8", "4/2", "1/2"], "2", "1/2 × 4 = 2."]],
  g4_fraction_of_number: [["input", "1/3 của 21 là bao nhiêu?", "7", "21:3."], ["multiple_choice", "2/5 của 30?", ["12", "6", "15", "10"], "12", "30×2:5."]],
  g4_practice_ch12: [["input", "3/4 × 2/5 = ?", "6/20", "Nhân tử mẫu."], ["multiple_choice", "1/2 của 18?", ["9", "36", "6", "12"], "9", "18:2."]],
  g4_review_natural: [["multiple_choice", "Số nào lớn nhất?", ["2 100 000", "2 099 999", "2 010 000", "2 001 000"], "2 100 000", "So từ trái."], ["input", "1 500 000 làm tròn triệu?", "2000000", "Hàng trăm nghìn ≥ 5."]],
  g4_review_natural_ops: [["input", "25 000 × 4 = ?", "100000", "Nhân có nhớ."], ["multiple_choice", "96 000 : 12 = ?", ["8000", "800", "80000", "9000"], "8000", "96:12=8."]],
  g4_review_fraction: [["multiple_choice", "3/4 và 5/8, lớn hơn?", ["3/4", "5/8", "Bằng", "Không so"], "3/4", "3/4 = 6/8."], ["input", "Rút gọn 15/20.", "3/4", "Chia 5."]],
  g4_review_fraction_ops: [["input", "1/2 + 1/3 = ? (mẫu 6)", "5/6", "3/6+2/6."], ["multiple_choice", "2/3 × 3/4 = ?", ["1/2", "6/12", "5/7", "2/4"], "1/2", "6/12=1/2."]],
  g4_review_geo_measure_final: [["input", "Góc tù > ? độ", "90", "Lớn hơn góc vuông."], ["multiple_choice", "1 tấn = ? tạ", ["10", "100", "1000", "1"], "10", "1 tấn = 10 tạ."]],
  g4_review_stats_final: [["multiple_choice", "Tung xu 10 lần, ngửa 6 lần. Số lần ngửa?", ["6", "4", "10", "16"], "6", "Đếm kết quả."], ["input", "Biểu đồ cột: cột cao nhất cho biết?", "số lớn nhất", "Chiều cao tỉ lệ số liệu."]],
  g4_review_final: [["input", "TBC 5, 7, 9?", "7", "21:3."], ["multiple_choice", "2/5 của 40?", ["16", "8", "20", "10"], "16", "40×2:5."]],
};

const errorPatterns = [
  ["g4_even_odd", "135", "even_odd_error", "Nhầm chẵn lẻ", "135 lẻ vì hàng đơn vị 5.", "Chia 2 hàng đơn vị."],
  ["g4_algebra_expression", "19", "algebra_order_error", "Cộng trước nhân", "2a khi a=5 là 10, không 2+5.", "Nhân trước khi cộng."],
  ["g4_round_hundred_thousand", "400000", "round_digit_error", "Làm tròn sai hàng", "456 789 làm tròn hàng trăm nghìn là 500 000.", "Nhìn hàng chục nghìn."],
  ["g4_weight_units", "500", "ton_kg_error", "Nhầm tấn và kg", "2 tấn = 2000 kg, không 500.", "1 tấn = 1000 kg."],
  ["g4_area_units", "10", "area_unit_error", "Nhầm m² và dm²", "1 m² = 100 dm², không 10.", "Mỗi cạnh gấp 10."],
  ["g4_sum_difference", "30", "sum_diff_formula_error", "Nhầm công thức", "Tổng 50 hiệu 10: số lớn 30, không 40.", "Lớn = (tổng+hiệu):2."],
  ["g4_angle_types", "nhọn", "angle_type_error", "Nhầm loại góc", "120° là góc tù, không nhọn.", "So với 90° và 180°."],
  ["g4_mul_div_powers10", "4500", "power10_zeros_error", "Sai số chữ số 0", "450×100=45000, không 4500.", "Đếm số chữ số 0."],
  ["g4_distributive", "130", "distributive_error", "Chưa phân phối", "6×(10+3)=78, không 60+3.", "Nhân cả hai số hạng."],
  ["g4_average", "24", "average_error", "Nhần TBC", "TBC (6+8+10)=8, không 24.", "Cộng rồi chia số lượng."],
  ["g4_unit_rate", "80000", "unit_rate_error", "Nhân trước chia sau", "Rút về đơn vị: chia trước.", "Tìm giá 1 đơn vị trước."],
  ["g4_simplify_fraction", "4/6", "simplify_error", "Chưa rút gọn", "8/12 = 2/3.", "Chia UCLN."],
  ["g4_add_fraction", "5/14", "fraction_add_error", "Cộng cả mẫu", "2/7+3/7=5/7, không cộng mẫu.", "Cùng mẫu chỉ cộng tử."],
  ["g4_div_fraction", "8/15", "fraction_div_error", "Chia tử cho tử", "2/3:4/5 = 2/3×5/4.", "Nhân nghịch đảo."],
  ["g4_fraction_of_number", "6", "fraction_of_error", "Chia ngược", "2/5 của 30 = 12, không 6.", "30×2:5."],
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
      numerator: id.includes("frac") ? 2 : 3,
      denominator: id.includes("frac") ? 3 : 4
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
    grade: 4,
    book: index < 37 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo: index + 1,
    domain: chapter,
    level: index < 24 ? 1 : index < 48 ? 2 : 3,
    prerequisite: index === 0 ? [] : [grade4[index - 1][0]],
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

function stripGrade4(items) {
  return items.filter((item) => {
    if (item.grade === 4) return false;
    const skillId = item.skill || item.id;
    return !(typeof skillId === "string" && skillId.startsWith("g4_"));
  });
}

const existingSkills = stripGrade4(await readJson(files.skills));
const existingLessons = stripGrade4(await readJson(files.lessons));
const existingQuestions = stripGrade4(await readJson(files.questions));
const existingErrors = stripGrade4(await readJson(files.errors));

const nextSkills = grade4.map(makeSkill);
const nextLessons = grade4.map(makeLesson);
const nextQuestions = grade4.flatMap(([id]) => makeQuestions(id));
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

console.log(`Added ${nextSkills.length} grade 4 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
