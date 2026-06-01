import { readFile, writeFile } from "node:fs/promises";

const files = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const SOURCE = "Bám sát SGK Toán 5 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.";

const grade5 = [
  ["g5_nat_review", "Bài 1. Ôn tập số tự nhiên", "Ôn tập và bổ sung", "Ôn tập đọc, viết, so sánh và sắp xếp số tự nhiên.", "place"],
  ["g5_nat_ops", "Bài 2. Ôn tập các phép tính với số tự nhiên", "Ôn tập và bổ sung", "Thực hiện cộng, trừ, nhân, chia số tự nhiên và giải bài toán nhiều bước.", "arithmetic"],
  ["g5_frac_review", "Bài 3. Ôn tập phân số", "Ôn tập và bổ sung", "Rút gọn, so sánh và thực hiện phép tính cơ bản với phân số.", "fractionCompare"],
  ["g5_frac_decimal", "Bài 4. Phân số thập phân", "Ôn tập và bổ sung", "Nhận biết phân số thập phân và chuyển đổi sang hỗn số hoặc số thập phân.", "fractionBar"],
  ["g5_frac_ops", "Bài 5. Ôn tập các phép tính với phân số", "Ôn tập và bổ sung", "Cộng, trừ, nhân, chia phân số trong các tình huống thực tế.", "fractionBar"],
  ["g5_frac_add_sub_diff", "Bài 6. Cộng, trừ hai phân số", "Ôn tập và bổ sung", "Cộng, trừ hai phân số khác mẫu số bằng cách quy đồng.", "fractionBar"],
  ["g5_mixed_number", "Bài 7. Hỗn số", "Ôn tập và bổ sung", "Đọc, viết, chuyển đổi hỗn số và phân số.", "numberLine"],
  ["g5_geo_measure_review", "Bài 8. Ôn tập hình học và đo lường", "Ôn tập và bổ sung", "Ôn tập nhận biết hình phẳng và đo lường cơ bản.", "geometry"],
  ["g5_practice_ch1", "Bài 9. Luyện tập chung", "Ôn tập và bổ sung", "Củng cố kiến thức số tự nhiên, phân số và hình học cơ bản.", "concept"],
  ["g5_decimal_intro", "Bài 10. Khái niệm số thập phân", "Số thập phân", "Hiểu khái niệm số thập phân, phần nguyên và phần thập phân.", "numberLine"],
  ["g5_decimal_compare", "Bài 11. So sánh các số thập phân", "Số thập phân", "So sánh, sắp xếp các số thập phân.", "numberLine"],
  ["g5_decimal_measure", "Bài 12. Viết số đo đại lượng dưới dạng số thập phân", "Số thập phân", "Viết số đo đại lượng bằng số thập phân phù hợp.", "concept"],
  ["g5_decimal_round", "Bài 13. Làm tròn số thập phân", "Số thập phân", "Làm tròn số thập phân đến hàng cho trước.", "estimate"],
  ["g5_practice_ch2", "Bài 14. Luyện tập chung", "Số thập phân", "Củng cố kiến thức số thập phân.", "numberLine"],
  ["g5_area_km_ha", "Bài 15. Ki-lô-mét vuông. Héc-ta", "Một số đơn vị đo diện tích", "Nhận biết km², ha và quan hệ với m².", "geometry"],
  ["g5_area_units", "Bài 16. Các đơn vị đo diện tích", "Một số đơn vị đo diện tích", "Quy đổi giữa các đơn vị đo diện tích.", "geometry"],
  ["g5_area_practice_exp", "Bài 17. Thực hành và trải nghiệm với một số đơn vị đo đại lượng", "Một số đơn vị đo diện tích", "Thực hành đo và quy đổi đơn vị diện tích.", "concept"],
  ["g5_practice_ch3", "Bài 18. Luyện tập chung", "Một số đơn vị đo diện tích", "Củng cố đơn vị đo diện tích.", "geometry"],
  ["g5_decimal_add", "Bài 19. Phép cộng số thập phân", "Các phép tính với số thập phân", "Cộng hai số thập phân bằng cách đặt tính thẳng hàng.", "arithmetic"],
  ["g5_decimal_sub", "Bài 20. Phép trừ số thập phân", "Các phép tính với số thập phân", "Trừ hai số thập phân và kiểm tra kết quả.", "arithmetic"],
  ["g5_decimal_mul", "Bài 21. Phép nhân số thập phân", "Các phép tính với số thập phân", "Nhân số thập phân với số tự nhiên hoặc số thập phân.", "arithmetic"],
  ["g5_decimal_div", "Bài 22. Phép chia số thập phân", "Các phép tính với số thập phân", "Chia số thập phân cho số tự nhiên hoặc số thập phân.", "arithmetic"],
  ["g5_decimal_scale", "Bài 23. Nhân, chia số thập phân với 10; 100; 1 000;... hoặc với 0,1; 0,01; 0,001;...", "Các phép tính với số thập phân", "Nhân, chia số thập phân với 10, 100, 0,1, 0,01...", "estimate"],
  ["g5_practice_ch4", "Bài 24. Luyện tập chung", "Các phép tính với số thập phân", "Củng cố các phép tính với số thập phân.", "arithmetic"],
  ["g5_triangle", "Bài 25. Hình tam giác. Diện tích hình tam giác", "Một số hình phẳng, chu vi và diện tích", "Nhận biết tam giác và tính diện tích tam giác.", "triangle"],
  ["g5_trapezoid", "Bài 26. Hình thang. Diện tích hình thang", "Một số hình phẳng, chu vi và diện tích", "Nhận biết hình thang và tính diện tích hình thang.", "geometry"],
  ["g5_circle", "Bài 27. Đường tròn. Chu vi và diện tích hình tròn", "Một số hình phẳng, chu vi và diện tích", "Nhận biết đường tròn, tính chu vi và diện tích.", "circle"],
  ["g5_geo_practice_exp", "Bài 28. Thực hành và trải nghiệm đo, vẽ, lắp ghép, tạo hình", "Một số hình phẳng, chu vi và diện tích", "Thực hành đo, vẽ và lắp ghép hình phẳng.", "geometry"],
  ["g5_practice_ch5", "Bài 29. Luyện tập chung", "Một số hình phẳng, chu vi và diện tích", "Củng cố diện tích tam giác, thang và hình tròn.", "triangle"],
  ["g5_review_decimal", "Bài 30. Ôn tập số thập phân", "Ôn tập học kì 1", "Ôn tập đọc, viết, so sánh số thập phân.", "numberLine"],
  ["g5_review_decimal_ops", "Bài 31. Ôn tập các phép tính với số thập phân", "Ôn tập học kì 1", "Ôn tập cộng, trừ, nhân, chia số thập phân.", "arithmetic"],
  ["g5_review_shapes", "Bài 32. Ôn tập một số hình phẳng", "Ôn tập học kì 1", "Ôn tập tam giác, thang, đường tròn.", "geometry"],
  ["g5_review_area_perim", "Bài 33. Ôn tập diện tích, chu vi một số hình phẳng", "Ôn tập học kì 1", "Ôn tập công thức chu vi và diện tích.", "triangle"],
  ["g5_review_measure", "Bài 34. Ôn tập đo lường", "Ôn tập học kì 1", "Ôn tập quy đổi đơn vị đo.", "estimate"],
  ["g5_review_hk1", "Bài 35. Ôn tập chung", "Ôn tập học kì 1", "Ôn tập tổng hợp học kì 1.", "concept"],
  ["g5_ratio_percent", "Bài 36. Tỉ số. Tỉ số phần trăm", "Tỉ số và các bài toán liên quan", "Nhận biết tỉ số và tỉ số phần trăm.", "ratio"],
  ["g5_map_scale", "Bài 37. Tỉ lệ bản đồ và ứng dụng", "Tỉ số và các bài toán liên quan", "Hiểu tỉ lệ bản đồ và tính độ dài thực tế.", "ratio"],
  ["g5_sum_ratio", "Bài 38. Tìm hai số khi biết tổng và tỉ số của hai số đó", "Tỉ số và các bài toán liên quan", "Tìm hai số khi biết tổng và tỉ số.", "ratio"],
  ["g5_diff_ratio", "Bài 39. Tìm hai số khi biết hiệu và tỉ số của hai số đó", "Tỉ số và các bài toán liên quan", "Tìm hai số khi biết hiệu và tỉ số.", "ratio"],
  ["g5_find_percent", "Bài 40. Tìm tỉ số phần trăm của hai số", "Tỉ số và các bài toán liên quan", "Tính tỉ số phần trăm của hai số.", "percent"],
  ["g5_percent_value", "Bài 41. Tìm giá trị phần trăm của một số", "Tỉ số và các bài toán liên quan", "Tính giá trị phần trăm của một số.", "percent"],
  ["g5_calculator", "Bài 42. Máy tính cầm tay", "Tỉ số và các bài toán liên quan", "Làm quen sử dụng máy tính cầm tay.", "concept"],
  ["g5_calculator_exp", "Bài 43. Thực hành và trải nghiệm sử dụng máy tính cầm tay", "Tỉ số và các bài toán liên quan", "Thực hành tính toán bằng máy tính cầm tay.", "concept"],
  ["g5_practice_ch7", "Bài 44. Luyện tập chung", "Tỉ số và các bài toán liên quan", "Củng cố tỉ số, phần trăm và bài toán tìm hai số.", "ratio"],
  ["g5_volume_intro", "Bài 45. Thể tích của một hình", "Thể tích. Đơn vị đo thể tích", "Hình thành biểu tượng về thể tích.", "solid"],
  ["g5_volume_cm_dm", "Bài 46. Xăng-ti-mét khối. Đề-xi-mét khối", "Thể tích. Đơn vị đo thể tích", "Nhận biết cm³, dm³ và quan hệ giữa chúng.", "solid"],
  ["g5_volume_m", "Bài 47. Mét khối", "Thể tích. Đơn vị đo thể tích", "Nhận biết m³ và quy đổi đơn vị thể tích.", "solid"],
  ["g5_practice_ch8", "Bài 48. Luyện tập chung", "Thể tích. Đơn vị đo thể tích", "Củng cố đơn vị đo thể tích.", "solid"],
  ["g5_nets", "Bài 49. Hình khai triển của hình lập phương, hình hộp chữ nhật và hình trụ", "Diện tích và thể tích của một số hình khối", "Nhận biết hình khai triển của hình lập phương, hộp chữ nhật, hình trụ.", "solid"],
  ["g5_box_surface", "Bài 50. Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật", "Diện tích và thể tích của một số hình khối", "Tính diện tích xung quanh và toàn phần hình hộp chữ nhật.", "solid"],
  ["g5_cube_surface", "Bài 51. Diện tích xung quanh và diện tích toàn phần của hình lập phương", "Diện tích và thể tích của một số hình khối", "Tính diện tích xung quanh và toàn phần hình lập phương.", "solid"],
  ["g5_box_volume", "Bài 52. Thể tích của hình hộp chữ nhật", "Diện tích và thể tích của một số hình khối", "Tính thể tích hình hộp chữ nhật.", "solid"],
  ["g5_cube_volume", "Bài 53. Thể tích của hình lập phương", "Diện tích và thể tích của một số hình khối", "Tính thể tích hình lập phương.", "solid"],
  ["g5_volume_practice_exp", "Bài 54. Thực hành tính toán và ước lượng thể tích một số hình khối", "Diện tích và thể tích của một số hình khối", "Thực hành ước lượng thể tích.", "estimate"],
  ["g5_practice_ch9", "Bài 55. Luyện tập chung", "Diện tích và thể tích của một số hình khối", "Củng cố diện tích và thể tích hình khối.", "solid"],
  ["g5_time_units", "Bài 56. Các đơn vị đo thời gian", "Số đo thời gian, vận tốc", "Nhận biết giờ, phút, giây, ngày, tháng, năm.", "concept"],
  ["g5_time_add_sub", "Bài 57. Cộng trừ số đo thời gian", "Số đo thời gian, vận tốc", "Cộng, trừ số đo thời gian.", "arithmetic"],
  ["g5_time_mul_div", "Bài 58. Nhân chia số đo thời gian với một số", "Số đo thời gian, vận tốc", "Nhân, chia số đo thời gian với một số.", "arithmetic"],
  ["g5_speed", "Bài 59. Vận tốc của một chuyển động đều", "Số đo thời gian, vận tốc", "Hiểu vận tốc và đơn vị km/h, m/s.", "ratio"],
  ["g5_distance_time", "Bài 60. Quãng đường, thời gian của một chuyển động đều", "Số đo thời gian, vận tốc", "Tính quãng đường, thời gian trong chuyển động đều.", "ratio"],
  ["g5_motion_practice_exp", "Bài 61. Thực hành tính toán và ước lượng về vận tốc, quãng đường, thời gian trong chuyển động đều", "Số đo thời gian, vận tốc", "Thực hành bài toán vận tốc, quãng đường, thời gian.", "estimate"],
  ["g5_practice_ch10", "Bài 62. Luyện tập chung", "Số đo thời gian, vận tốc", "Củng cố toán thời gian và chuyển động đều.", "ratio"],
  ["g5_data_collect", "Bài 63. Thu thập, phân loại, sắp xếp các số liệu", "Một số yếu tố thống kê và xác suất", "Thu thập, phân loại, sắp xếp số liệu thống kê.", "data"],
  ["g5_pie_chart", "Bài 64. Biểu đồ hình quạt", "Một số yếu tố thống kê và xác suất", "Đọc và biểu diễn dữ liệu bằng biểu đồ hình quạt.", "chart"],
  ["g5_probability_ratio", "Bài 65. Tỉ số của số lần lặp lại của một sự kiện so với tổng số lần thực hiện", "Một số yếu tố thống kê và xác suất", "Tính tỉ số số lần xảy ra sự kiện trên tổng số lần thử.", "probability"],
  ["g5_stats_practice_exp", "Bài 66. Thực hành và trải nghiệm. Thu thập, phân tích, biểu diễn các số liệu thống kê", "Một số yếu tố thống kê và xác suất", "Thực hành thu thập và phân tích số liệu.", "data"],
  ["g5_practice_ch11", "Bài 67. Luyện tập chung", "Một số yếu tố thống kê và xác suất", "Củng cố thống kê và xác suất.", "chart"],
  ["g5_review_numbers", "Bài 68. Ôn tập số tự nhiên, phân số, số thập phân", "Ôn tập cuối năm", "Ôn tập số tự nhiên, phân số, số thập phân.", "numberLine"],
  ["g5_review_ops", "Bài 69. Ôn tập các phép tính với số tự nhiên, phân số, số thập phân", "Ôn tập cuối năm", "Ôn tập biểu thức và các phép tính hỗn hợp.", "pemdas"],
  ["g5_review_ratio_percent", "Bài 70. Ôn tập tỉ số, tỉ số phần trăm", "Ôn tập cuối năm", "Ôn tập tỉ số và phần trăm.", "percent"],
  ["g5_review_geometry", "Bài 71. Ôn tập hình học", "Ôn tập cuối năm", "Ôn tập tam giác, thang, hình tròn.", "geometry"],
  ["g5_review_measure_final", "Bài 72. Ôn tập đo lường", "Ôn tập cuối năm", "Ôn tập đo lường diện tích, thể tích.", "estimate"],
  ["g5_review_motion", "Bài 73. Ôn tập toán chuyển động đều", "Ôn tập cuối năm", "Ôn tập bài toán chuyển động đều.", "ratio"],
  ["g5_review_stats", "Bài 74. Ôn tập một số yếu tố thống kê và xác suất", "Ôn tập cuối năm", "Ôn tập thống kê và xác suất.", "probability"],
  ["g5_review_final", "Bài 75. Ôn tập chung", "Ôn tập cuối năm", "Ôn tập tổng hợp cuối năm.", "concept"]
];

const chapters = [...new Set(grade5.map((lesson) => lesson[2]))];

const core = {
  "g5_nat_review": ["Giá trị theo vị trí", "Chữ số ở mỗi hàng cho giá trị khác nhau.", "Trong 45 678, chữ số 5 ở hàng nghìn có giá trị 5 000.", "So sánh từ hàng cao nhất khi xếp thứ tự."],
  "g5_nat_ops": ["Tính và kiểm tra", "Dùng phép tính ngược để kiểm tra kết quả.", "356 + 248 = 604; kiểm tra 604 - 248 = 356.", "Chọn phép tính phù hợp với lời giải."],
  "g5_frac_review": ["Phân số bằng nhau", "Nhân hoặc chia cả tử và mẫu với cùng số khác 0.", "2/3 = 4/6 = 8/12.", "Rút gọn bằng cách chia tử và mẫu cho ước chung."],
  "g5_frac_decimal": ["Phần mười, trăm", "Phân số thập phân có mẫu 10, 100, 1000...", "75/100 = 0,75.", "Đếm số chữ số sau dấu phẩy để đọc đúng."],
  "g5_frac_ops": ["Quy đồng trước", "Cộng trừ phân số khác mẫu cần mẫu chung.", "1/2 + 1/3 = 3/6 + 2/6 = 5/6.", "Nhân tử với tử, mẫu với mẫu khi nhân phân số."],
  "g5_frac_add_sub_diff": ["Mẫu chung nhỏ nhất", "Quy đồng rồi cộng hoặc trừ tử số.", "3/4 - 1/6 = 9/12 - 2/12 = 7/12.", "Chỉ cộng trừ tử khi mẫu đã bằng nhau."],
  "g5_mixed_number": ["Phần nguyên + phân số", "Hỗn số gồm phần nguyên và phân số dương.", "2 1/4 = 9/4.", "Chuyển hỗn số sang phân số trước khi tính nếu cần."],
  "g5_geo_measure_review": ["Đo và nhận dạng", "Chu vi đo quanh, diện tích đo phần mặt phẳng.", "Hình vuông cạnh 5 cm có chu vi 20 cm.", "Dùng đúng đơn vị đo trước khi tính."],
  "g5_practice_ch1": ["Tổng hợp số học", "Kết hợp số tự nhiên, phân số và đo lường.", "1/2 của 24 là 12.", "Đọc kỹ yêu cầu để chọn kiến thức phù hợp."],
  "g5_decimal_intro": ["Dấu phẩy thập phân", "Phần bên trái dấu phẩy là phần nguyên.", "3,25 đọc là ba phẩy hai mươi lăm.", "Mỗi hàng sau dấu phẩy nhỏ hơn hàng trước 10 lần."],
  "g5_decimal_compare": ["So từng hàng", "So sánh phần nguyên trước, rồi đến phần thập phân.", "2,35 > 2,3 vì hàng phần trăm 5 > 0.", "Thêm số 0 ở cuối không đổi giá trị: 0,5 = 0,50."],
  "g5_decimal_measure": ["Số đo thực tế", "Dùng số thập phân cho chiều dài, khối lượng, tiền.", "1 kg 250 g viết 1,25 kg.", "Chọn đơn vị phù hợp với đề bài."],
  "g5_decimal_round": ["Nhìn chữ số kế tiếp", "Làm tròn lên nếu chữ số bên phải hàng cần làm tròn ≥ 5.", "3,76 làm tròn đến hàng phần mười là 3,8.", "Xác định đúng hàng cần làm tròn."],
  "g5_practice_ch2": ["Củng cố số thập phân", "Đọc, so sánh, làm tròn và viết số đo.", "0,375 làm tròn đến hàng phần trăm là 0,38.", "Kiểm tra bằng ước lượng."],
  "g5_area_km_ha": ["Đơn vị lớn", "1 km² = 100 ha = 1 000 000 m².", "Một sân bóng khoảng 7 000 m².", "Chọn km² hoặc ha cho diện tích rộng lớn."],
  "g5_area_units": ["Quy đổi diện tích", "1 m² = 100 dm² = 10 000 cm².", "2 m² = 20 000 cm².", "Viết bảng quy đổi trước khi tính."],
  "g5_area_practice_exp": ["Đo thực tế", "Dùng thước và công thức để ước lượng diện tích.", "Phòng học dài 8 m, rộng 6 m có diện tích 48 m².", "Ghi rõ đơn vị trong đáp số."],
  "g5_practice_ch3": ["Quy đổi diện tích", "Chuyển đổi giữa m², ha, km².", "0,5 ha = 5 000 m².", "Nhân hoặc chia theo hệ số quy đổi."],
  "g5_decimal_add": ["Thẳng hàng dấu phẩy", "Đặt tính sao cho dấu phẩy thẳng cột.", "12,5 + 3,75 = 16,25.", "Thêm số 0 nếu cần cho đủ hàng."],
  "g5_decimal_sub": ["Trừ như số tự nhiên", "Đặt thẳng dấu phẩy rồi trừ từng hàng.", "8,4 - 2,75 = 5,65.", "Kiểm tra bằng phép cộng ngược."],
  "g5_decimal_mul": ["Đếm chữ số thập phân", "Tích có số chữ số thập phân bằng tổng số chữ số thập phân của hai thừa số.", "1,2 · 0,3 = 0,36.", "Bỏ dấu phẩy khi nhân, rồi đặt lại."],
  "g5_decimal_div": ["Chia cho số tự nhiên", "Chia như số tự nhiên, đặt dấu phẩy khi hết phần nguyên.", "7,2 : 4 = 1,8.", "Nhân thêm 10, 100... nếu cần chia hết."],
  "g5_decimal_scale": ["Dịch dấu phẩy", "Nhân 10, 100... dịch dấu phẩy sang phải; chia hoặc nhân 0,1, 0,01... dịch sang trái.", "3,45 · 100 = 345.", "Đếm số chữ số 0 để biết dịch bao nhiêu hàng."],
  "g5_practice_ch4": ["Tính với số thập phân", "Cộng, trừ, nhân, chia trong một bài.", "(2,5 + 1,5) · 2 = 8.", "Làm trong ngoặc trước."],
  "g5_triangle": ["Một nửa đáy nhân cao", "Diện tích tam giác = đáy · cao : 2.", "Tam giác đáy 10 cm, cao 6 cm có diện tích 30 cm².", "Cao phải vuông góc với đáy tương ứng."],
  "g5_trapezoid": ["Trung bình hai đáy", "Diện tích hình thang = (đáy lớn + đáy nhỏ) · cao : 2.", "Hình thang hai đáy 8 cm và 12 cm, cao 5 cm có diện tích 50 cm².", "Cộng hai đáy trước khi nhân cao."],
  "g5_circle": ["Pi và bán kính", "Chu vi C = 2 · 3,14 · r; diện tích S = 3,14 · r².", "Hình tròn bán kính 5 cm có chu vi khoảng 31,4 cm.", "Phân biệt bán kính và đường kính."],
  "g5_geo_practice_exp": ["Vẽ và đo", "Dùng compa vẽ đường tròn, thước đo cạnh.", "Tam giác vuông có một góc 90 độ.", "Ghi đúng tên hình và đơn vị đo."],
  "g5_practice_ch5": ["Diện tích hình phẳng", "Chọn công thức theo loại hình.", "Hình tròn r = 3 cm có diện tích khoảng 28,26 cm².", "Kiểm tra đơn vị đo trước khi thay số."],
  "g5_review_decimal": ["Ôn số thập phân", "Đọc, viết, so sánh và làm tròn.", "4,508 > 4,5.", "So sánh từng hàng từ trái sang phải."],
  "g5_review_decimal_ops": ["Ôn phép tính thập phân", "Cộng, trừ, nhân, chia số thập phân.", "2,4 · 1,5 = 3,6.", "Ước lượng để phát hiện sai dấu phẩy."],
  "g5_review_shapes": ["Nhận dạng hình", "Tam giác, thang, đường tròn có đặc điểm riêng.", "Hình thang có một cặp cạnh đối song song.", "Đếm cạnh và góc để phân loại."],
  "g5_review_area_perim": ["Chu vi và diện tích", "Chu vi là tổng độ dài các cạnh bao quanh.", "Hình chữ nhật 6 cm × 4 cm có diện tích 24 cm².", "Không nhầm chu vi với diện tích."],
  "g5_review_measure": ["Quy đổi đơn vị", "Đổi về cùng đơn vị trước khi tính.", "1,5 m² = 15 000 cm².", "Viết hệ số quy đổi cạnh công thức."],
  "g5_review_hk1": ["Tổng hợp HK1", "Kết hợp số thập phân, hình học và đo lường.", "3,2 + 1,8 = 5.", "Đọc kỹ đề để chọn công thức đúng."],
  "g5_ratio_percent": ["Tỉ số và phần trăm", "Tỉ số a:b; phần trăm là tỉ số có mẫu 100.", "Tỉ số 3:5 nghĩa là chia thành 3 phần và 5 phần.", "25% = 25/100 = 1/4."],
  "g5_map_scale": ["Tỉ lệ bản đồ", "Tỉ lệ 1:100 000 nghĩa 1 cm trên bản đồ là 100 000 cm thực tế.", "3 cm trên bản đồ tỉ lệ 1:50 000 tương ứng 1,5 km.", "Đổi cùng đơn vị trước khi tính."],
  "g5_sum_ratio": ["Tổng và tỉ số", "Tổng số phần = tổng hai số; mỗi phần = tổng : tổng phần.", "Hai số có tổng 40, tỉ số 3:5 thì số nhỏ là 15.", "Vẽ sơ đồ tỉ số để dễ hình dung."],
  "g5_diff_ratio": ["Hiệu và tỉ số", "Hiệu số phần = hiệu hai số.", "Hai số hiệu 8, tỉ số 5:3 thì số lớn là 20.", "Lấy hiệu chia cho hiệu số phần."],
  "g5_find_percent": ["Phần trăm của hai số", "Tỉ số phần trăm = số thứ nhất : số thứ hai · 100%.", "25 là bao nhiêu phần trăm của 200? Đáp số 12,5%.", "Nhân 100 sau khi chia."],
  "g5_percent_value": ["Giá trị phần trăm", "a% của n bằng n · a/100.", "20% của 150 là 30.", "Đổi phần trăm thành phân số hoặc số thập phân."],
  "g5_calculator": ["Máy tính cầm tay", "Dùng để tính nhanh và kiểm tra kết quả.", "Tính 15% của 240 bằng máy: 240 × 15 ÷ 100 = 36.", "Nhập đúng thứ tự phép tính."],
  "g5_calculator_exp": ["Thực hành máy tính", "Kiểm tra phép tính phức tạp bằng máy.", "(48 + 52) × 0,25 = 25.", "Ước lượng trước để biết kết quả hợp lý."],
  "g5_practice_ch7": ["Bài toán tỉ số", "Tổng, hiệu, phần trăm và tỉ lệ bản đồ.", "Tổng 72, tỉ số 2:7 thì số thứ hai là 56.", "Xác định bài toán thuộc loại nào."],
  "g5_volume_intro": ["Thể tích chiếm chỗ", "Thể tích đo dung tích không gian hình chiếm.", "Hộp đựng nước 1 lít có thể tích 1 dm³.", "Phân biệt diện tích mặt và thể tích."],
  "g5_volume_cm_dm": ["cm³ và dm³", "1 dm³ = 1 000 cm³.", "Hộp lập phương cạnh 10 cm có thể tích 1 000 cm³ = 1 dm³.", "1 lít = 1 dm³."],
  "g5_volume_m": ["m³ và quy đổi", "1 m³ = 1 000 dm³ = 1 000 000 cm³.", "Bể nước 2 m³ chứa 2 000 lít.", "Chọn đơn vị phù hợp với kích thước vật."],
  "g5_practice_ch8": ["Quy đổi thể tích", "Chuyển giữa cm³, dm³, m³.", "500 cm³ = 0,5 dm³.", "Nhân hoặc chia 1000 theo bậc đơn vị."],
  "g5_nets": ["Hình khai triển", "Hình khai triển gồm các mặt ghép lại tạo hình khối.", "Hình lập phương có hình khai triển gồm 6 hình vuông.", "Đếm mặt trước khi tính diện tích."],
  "g5_box_surface": ["Diện tích hộp chữ nhật", "S xq = chu vi đáy · cao; S tp = S xq + 2 · S đáy.", "Hộp 4×3×2 cm có S xq = 28 cm².", "Xác định đáy và chiều cao trước."],
  "g5_cube_surface": ["Diện tích lập phương", "S tp = 6 · a² với a là cạnh.", "Hình lập phương cạnh 5 cm có S tp = 150 cm².", "Lập phương có 6 mặt bằng nhau."],
  "g5_box_volume": ["Thể tích hộp chữ nhật", "V = dài · rộng · cao.", "Hộp 5×4×3 cm có V = 60 cm³.", "Đơn vị thể tích là cm³, dm³ hoặc m³."],
  "g5_cube_volume": ["Thể tích lập phương", "V = a · a · a = a³.", "Cạnh 4 cm thì V = 64 cm³.", "a³ nghĩa a nhân với chính nó ba lần."],
  "g5_volume_practice_exp": ["Ước lượng thể tích", "Dùng hình quen thuộc để ước lượng.", "Thùng sữa khoảng 1 dm³.", "So sánh với vật quen thuộc hàng ngày."],
  "g5_practice_ch9": ["Diện tích và thể tích", "Tính S và V của hình khối.", "Hộp chữ nhật 6×2×3 cm có V = 36 cm³.", "Ghi rõ đang tính diện tích hay thể tích."],
  "g5_time_units": ["Đơn vị thời gian", "1 giờ = 60 phút; 1 phút = 60 giây; 1 ngày = 24 giờ.", "2 giờ 30 phút = 150 phút.", "Đổi về cùng đơn vị trước khi tính."],
  "g5_time_add_sub": ["Cộng trừ thời gian", "Cộng phút, nhớ 60 phút = 1 giờ.", "1 giờ 45 phút + 35 phút = 2 giờ 20 phút.", "60 phút = 1 giờ, 60 giây = 1 phút."],
  "g5_time_mul_div": ["Nhân chia thời gian", "Nhân số phút với số lần làm việc.", "45 phút × 3 = 135 phút = 2 giờ 15 phút.", "Chia hết giờ thành phút nếu cần."],
  "g5_speed": ["Vận tốc", "v = s : t với s quãng đường, t thời gian.", "Đi 60 km trong 2 giờ, vận tốc 30 km/h.", "Đơn vị vận tốc thường là km/h hoặc m/s."],
  "g5_distance_time": ["Quãng đường và thời gian", "s = v · t; t = s : v.", "Vận tốc 40 km/h, đi 3 giờ được 120 km.", "Viết công thức trước khi thay số."],
  "g5_motion_practice_exp": ["Ước lượng chuyển động", "Dự đoán quãng đường hoặc thời gian hợp lý.", "Xe đi 50 km/h trong 0,5 giờ đi khoảng 25 km.", "Kiểm tra đơn vị km, giờ, km/h."],
  "g5_practice_ch10": ["Chuyển động đều", "Kết hợp thời gian, vận tốc, quãng đường.", "Đi 90 km với 45 km/h hết 2 giờ.", "Tìm đại lượng chưa biết bằng công thức."],
  "g5_data_collect": ["Sắp xếp số liệu", "Thu thập, phân loại và xếp thứ tự dữ liệu.", "Điểm kiểm tra: 7, 8, 6, 9 sắp xếp thành 6, 7, 8, 9.", "Ghi rõ tiêu chí phân loại."],
  "g5_pie_chart": ["Biểu đồ quạt tròn", "Mỗi phần trăm tương ứng một góc của hình tròn.", "25% chiếm 90° vì 25% × 360° = 90°.", "Đọc nhãn và phần trăm trên biểu đồ."],
  "g5_probability_ratio": ["Tần suất thực nghiệm", "Tỉ số = số lần xảy ra : tổng số lần thử.", "Gieo xúc xắc 20 lần, ra 6 được 4 lần thì tỉ số 4/20.", "Càng thử nhiều lần, tỉ số thường ổn định hơn."],
  "g5_stats_practice_exp": ["Phân tích số liệu", "Thu thập rồi biểu diễn bằng bảng hoặc biểu đồ.", "40% học sinh thích bóng đá trên biểu đồ quạt.", "Nêu nhận xét kèm con số."],
  "g5_practice_ch11": ["Thống kê và xác suất", "Đọc biểu đồ và tính tỉ số thực nghiệm.", "Tung xu 10 lần, sấp 6 lần: tỉ số 6/10.", "Luôn ghi tổng số lần thử."],
  "g5_review_numbers": ["Ôn số học", "Số tự nhiên, phân số, số thập phân.", "3/4 = 0,75.", "Chuyển đổi dạng số trước khi so sánh."],
  "g5_review_ops": ["Biểu thức hỗn hợp", "Thực hiện nhân chia trước cộng trừ.", "12 + 8 : 2 = 16.", "Làm phép tính trong ngoặc trước."],
  "g5_review_ratio_percent": ["Ôn tỉ số phần trăm", "Tính phần trăm và giá trị phần trăm.", "15% của 200 là 30.", "Đổi % thành phân số hoặc số thập phân."],
  "g5_review_geometry": ["Ôn hình học", "Tam giác, thang, hình tròn.", "Diện tích tam giác đáy 8, cao 5 là 20.", "Chọn đúng công thức theo hình."],
  "g5_review_measure_final": ["Ôn đo lường", "Quy đổi đơn vị diện tích, thể tích.", "2 dm³ = 2 000 cm³.", "Kiểm tra đơn vị trong đáp số."],
  "g5_review_motion": ["Ôn chuyển động đều", "Tìm v, s, t.", "s = 50 km/h × 2 h = 100 km.", "Viết công thức trước khi tính."],
  "g5_review_stats": ["Ôn thống kê xác suất", "Đọc biểu đồ quạt và tỉ số thực nghiệm.", "30% trên quạt tròn là 108°.", "Nhân phần trăm với 360°."],
  "g5_review_final": ["Ôn tập cuối năm", "Tổng hợp toàn bộ chương trình lớp 5.", "2,5 + 1,75 = 4,25.", "Đọc kỹ đề và chọn kiến thức phù hợp."],
};

const questions = {
  "g5_nat_review": [["multiple_choice", "Số nào lớn nhất?", ["45 678", "45 768", "45 687", "45 876"], "45 876", "So sánh từ hàng chục nghìn."], ["input", "Trong số 52 304, chữ số 2 có giá trị là bao nhiêu?", "2000", "Chữ số 2 ở hàng nghìn."]],
  "g5_nat_ops": [["input", "Tính 456 + 278.", "734", "Cộng từ hàng đơn vị."], ["multiple_choice", "864 - 395 bằng bao nhiêu?", ["469", "559", "569", "479"], "469", "Trừ từng hàng, nhớ nếu cần."]],
  "g5_frac_review": [["multiple_choice", "Phân số nào bằng 1/2?", ["3/6", "2/5", "3/8", "4/9"], "3/6", "Nhân tử và mẫu của 1/2 với 3."], ["input", "Rút gọn 8/12.", "2/3", "Chia tử và mẫu cho 4."]],
  "g5_frac_decimal": [["multiple_choice", "75/100 bằng số thập phân nào?", ["0,75", "7,5", "0,075", "75"], "0,75", "Hai chữ số thập phân."], ["input", "Viết 3/10 dưới dạng số thập phân.", "0,3", "Một chữ số sau dấu phẩy."]],
  "g5_frac_ops": [["input", "Tính 1/3 + 1/6.", "1/2", "Quy đồng mẫu 6."], ["multiple_choice", "2/3 · 3/4 bằng bao nhiêu?", ["1/2", "6/7", "5/7", "2/12"], "1/2", "Nhân tử với tử, mẫu với mẫu."]],
  "g5_frac_add_sub_diff": [["input", "Tính 5/6 - 1/4.", "7/12", "Mẫu chung 12."], ["multiple_choice", "1/2 + 2/5 bằng?", ["9/10", "3/7", "3/10", "4/10"], "9/10", "Quy đồng mẫu 10."]],
  "g5_mixed_number": [["multiple_choice", "2 1/4 bằng phân số nào?", ["9/4", "6/4", "8/4", "5/4"], "9/4", "2 = 8/4, cộng thêm 1/4."], ["input", "Đổi 7/3 thành hỗn số (dạng a b/c).", "2 1/3", "7 chia 3 được 2 dư 1."]],
  "g5_geo_measure_review": [["input", "Chu vi hình vuông cạnh 7 cm là bao nhiêu cm?", "28", "Chu vi = 4 × cạnh."], ["multiple_choice", "Diện tích hình chữ nhật dài 9 cm, rộng 4 cm là?", ["36 cm2", "26 cm2", "13 cm2", "18 cm2"], "36 cm2", "Diện tích = dài × rộng."]],
  "g5_practice_ch1": [["input", "1/4 của 48 bằng bao nhiêu?", "12", "48 : 4."], ["multiple_choice", "Số nào nhỏ nhất?", ["0,45", "0,405", "0,54", "0,504"], "0,405", "So sánh hàng phần mười trước."]],
  "g5_decimal_intro": [["multiple_choice", "Số 3,07 đọc là gì?", ["Ba phẩy không bảy", "Ba phẩy bảy", "Ba mươi không bảy", "Ba phẩy linh bảy"], "Ba phẩy không bảy", "Phần thập phân 07 là không bảy."], ["input", "Viết bằng chữ số: năm phẩy mười hai.", "5,12", "Phần nguyên 5, phần thập phân 12."]],
  "g5_decimal_compare": [["multiple_choice", "Số nào lớn hơn?", ["2,45", "2,405"], "2,45", "Hàng phần trăm 4 > 0."], ["input", "Điền dấu >, < hoặc =: 0,6 ___ 0,60", "=", "Thêm 0 không đổi giá trị."]],
  "g5_decimal_measure": [["input", "1 kg 250 g viết bằng kg là bao nhiêu?", "1,25", "250 g = 0,25 kg."], ["multiple_choice", "1 m 35 cm viết bằng m là?", ["1,35", "135", "13,5", "0,135"], "1,35", "35 cm = 0,35 m."]],
  "g5_decimal_round": [["input", "Làm tròn 4,68 đến hàng phần mười.", "4,7", "Chữ số hàng phần trăm là 8 ≥ 5."], ["multiple_choice", "3,141 làm tròn đến hàng phần trăm là?", ["3,14", "3,15", "3,1", "3,141"], "3,14", "Chữ số hàng phần nghìn là 1 < 5."]],
  "g5_practice_ch2": [["input", "Số nhỏ nhất trong 2,5; 2,05; 2,55 là?", "2,05", "So sánh phần nguyên và thập phân."], ["multiple_choice", "0,875 làm tròn đến hàng phần mười là?", ["0,9", "0,8", "0,88", "1,0"], "0,9", "Hàng phần trăm là 7 ≥ 5."]],
  "g5_area_km_ha": [["multiple_choice", "1 km² bằng bao nhiêu ha?", ["100", "1000", "10", "10000"], "100", "1 km² = 100 ha."], ["input", "2 ha bằng bao nhiêu m²?", "20000", "1 ha = 10 000 m²."]],
  "g5_area_units": [["input", "3 m² bằng bao nhiêu cm²?", "30000", "1 m² = 10 000 cm²."], ["multiple_choice", "5 000 m² bằng bao nhiêu ha?", ["0,5", "5", "50", "0,05"], "0,5", "Chia cho 10 000."]],
  "g5_area_practice_exp": [["input", "Phòng dài 8 m, rộng 5 m. Diện tích bao nhiêu m²?", "40", "8 × 5."], ["multiple_choice", "Diện tích nào phù hợp cho sân vận động?", ["7 000 m²", "7 m²", "70 m²", "700 m²"], "7 000 m²", "Sân vận động rất rộng."]],
  "g5_practice_ch3": [["input", "0,25 ha = ? m²", "2500", "0,25 × 10 000."], ["multiple_choice", "1 km² = ? m²", ["1000000", "10000", "100000", "1000"], "1000000", "1 km² = 1 000 000 m²."]],
  "g5_decimal_add": [["input", "Tính 12,5 + 3,75.", "16,25", "Đặt thẳng dấu phẩy."], ["multiple_choice", "6,08 + 2,4 bằng?", ["8,48", "8,08", "6,32", "8,88"], "8,48", "Thêm 0: 2,40."]],
  "g5_decimal_sub": [["input", "Tính 9,2 - 3,75.", "5,45", "Đặt thẳng dấu phẩy."], ["multiple_choice", "15 - 4,36 bằng?", ["10,64", "11,64", "10,36", "11,36"], "10,64", "Viết 15,00 - 4,36."]],
  "g5_decimal_mul": [["input", "Tính 1,5 · 0,4.", "0,6", "15 × 4 = 60, hai chữ số thập phân."], ["multiple_choice", "2,5 · 3 bằng?", ["7,5", "75", "0,75", "25"], "7,5", "25 phần mười × 3."]],
  "g5_decimal_div": [["input", "Tính 6,3 : 3.", "2,1", "Chia như số tự nhiên."], ["multiple_choice", "4,8 : 0,6 bằng?", ["8", "0,8", "80", "0,08"], "8", "Nhân cả hai với 10."]],
  "g5_decimal_scale": [["input", "3,45 · 100 = ?", "345", "Dịch dấu phẩy sang phải 2 hàng."], ["multiple_choice", "56 : 0,1 bằng?", ["560", "5,6", "0,56", "5600"], "560", "Chia 0,1 = nhân 10."]],
  "g5_practice_ch4": [["input", "Tính (2,4 + 1,6) · 0,5.", "2", "Trong ngoặc trước."], ["multiple_choice", "7,2 : 0,8 bằng?", ["9", "0,9", "90", "8"], "9", "Nhân 10 để bỏ dấu phẩy mẫu."]],
  "g5_triangle": [["input", "Tam giác đáy 12 cm, cao 5 cm. Diện tích?", "30", "12 × 5 : 2."], ["multiple_choice", "Diện tích tam giác = ?", ["đáy × cao : 2", "đáy + cao", "đáy × cao", "(đáy + cao) : 2"], "đáy × cao : 2", "Công thức diện tích tam giác."]],
  "g5_trapezoid": [["input", "Hình thang đáy 6 cm và 10 cm, cao 4 cm. Diện tích?", "32", "(6+10)×4:2."], ["multiple_choice", "Công thức diện tích hình thang?", ["(a+b)·h:2", "a·b·h", "(a+b)·h", "a·b:2"], "(a+b)·h:2", "a, b là hai đáy."]],
  "g5_circle": [["input", "Hình tròn r = 5 cm. Chu vi (dùng 3,14)?", "31,4", "2 × 3,14 × 5."], ["multiple_choice", "Diện tích hình tròn r = 2 cm (3,14) là?", ["12,56 cm2", "6,28 cm2", "12,56 cm", "6,28 cm2"], "12,56 cm2", "3,14 × 2 × 2."]],
  "g5_geo_practice_exp": [["multiple_choice", "Dụng cụ vẽ đường tròn là gì?", ["Compa", "Thước kẻ", "Eke", "Thước dây"], "Compa", "Compa giữ bán kính cố định."], ["input", "Tam giác có một góc 90° gọi là tam giác gì?", "vuông", "Góc vuông bằng 90°."]],
  "g5_practice_ch5": [["input", "Tam giác đáy 8 cm, cao 6 cm. Diện tích?", "24", "8×6:2."], ["multiple_choice", "Hình tròn d = 10 cm, r = ?", ["5 cm", "10 cm", "20 cm", "2,5 cm"], "5 cm", "r = d : 2."]],
  "g5_review_decimal": [["multiple_choice", "Số nào lớn nhất?", ["3,405", "3,45", "3,504", "3,054"], "3,504", "So sánh từng hàng."], ["input", "0,8 + 0,35 = ?", "1,15", "Đặt thẳng dấu phẩy."]],
  "g5_review_decimal_ops": [["input", "1,2 · 2,5 = ?", "3", "12×25=300, hai chữ số thập phân."], ["multiple_choice", "9,6 : 3 = ?", ["3,2", "32", "0,32", "2,3"], "3,2", "Chia như số tự nhiên."]],
  "g5_review_shapes": [["multiple_choice", "Hình nào có một cặp cạnh đối song song?", ["Hình thang", "Hình vuông", "Tam giác đều", "Hình tròn"], "Hình thang", "Thang có một cặp đáy song song."], ["input", "Hình tròn có bao nhiêu trục đối xứng?", "vô số", "Mọi đường kính đều là trục đối xứng."]],
  "g5_review_area_perim": [["input", "Hình vuông cạnh 6 cm. Diện tích?", "36", "6×6."], ["multiple_choice", "Chu vi hình chữ nhật 5×3 cm là?", ["16 cm", "15 cm", "8 cm", "30 cm"], "16 cm", "(5+3)×2."]],
  "g5_review_measure": [["input", "1,5 m² = ? cm²", "15000", "1 m² = 10 000 cm²."], ["multiple_choice", "1 ha = ? m²", ["10000", "100000", "1000", "1000000"], "10000", "1 ha = 10 000 m²."]],
  "g5_review_hk1": [["input", "2,75 + 1,25 = ?", "4", "Cộng phần thập phân."], ["multiple_choice", "Diện tích tam giác đáy 10, cao 4?", ["20", "40", "14", "24"], "20", "10×4:2."]],
  "g5_ratio_percent": [["multiple_choice", "Tỉ số 2:5 nghĩa là gì?", ["Chia thành 2 phần và 5 phần", "2 + 5 = 7", "2 × 5 = 10", "2/5 = 10"], "Chia thành 2 phần và 5 phần", "Tỉ số so sánh hai phần."], ["input", "25% = ?/100", "25", "Phần trăm có mẫu 100."]],
  "g5_map_scale": [["input", "Bản đồ tỉ lệ 1:200 000, 3 cm trên bản đồ = ? km thực tế", "6", "3×200 000 cm = 600 000 cm = 6 km."], ["multiple_choice", "Tỉ lệ 1:50 000 nghĩa 1 cm trên bản đồ là?", ["500 m thực tế", "50 m", "5 km", "500 km"], "500 m thực tế", "50 000 cm = 500 m."]],
  "g5_sum_ratio": [["input", "Tổng 48, tỉ số 1:3. Số nhỏ hơn?", "12", "Tổng 4 phần, mỗi phần 12."], ["multiple_choice", "Tổng 60, tỉ số 2:3. Số lớn hơn?", ["36", "24", "30", "40"], "36", "60:5×3=36."]],
  "g5_diff_ratio": [["input", "Hiệu 12, tỉ số 5:3. Số lớn hơn?", "30", "Hiệu 2 phần = 12, mỗi phần 6, số lớn 30."], ["multiple_choice", "Hiệu 10, tỉ số 7:2. Số nhỏ hơn?", ["4", "14", "20", "10"], "4", "Hiệu 5 phần = 10."]],
  "g5_find_percent": [["input", "15 là bao nhiêu % của 60?", "25", "15:60×100=25%."], ["multiple_choice", "8/20 = ?%", ["40", "80", "20", "8"], "40", "8:20×100=40%."]],
  "g5_percent_value": [["input", "30% của 200 là bao nhiêu?", "60", "200×30:100."], ["multiple_choice", "12,5% của 80 là?", ["10", "12,5", "8", "100"], "10", "80×0,125=10."]],
  "g5_calculator": [["multiple_choice", "Máy tính cầm tay dùng để?", ["Tính toán nhanh và kiểm tra", "Vẽ hình", "Đo góc", "Viết văn"], "Tính toán nhanh và kiểm tra", "Hỗ trợ tính toán số học."], ["input", "Dùng máy tính: 15% của 240 = ?", "36", "240×15÷100."]],
  "g5_calculator_exp": [["input", "(48+52)×0,25 = ?", "25", "Tính trong ngoặc trước."], ["multiple_choice", "Kết quả 200×12% là?", ["24", "240", "2,4", "1200"], "24", "200×12÷100."]],
  "g5_practice_ch7": [["input", "Tổng 63, tỉ số 4:5. Số thứ hai?", "35", "63:9×5."], ["multiple_choice", "20% của 150?", ["30", "20", "75", "3"], "30", "150×0,2."]],
  "g5_volume_intro": [["multiple_choice", "Thể tích đo gì?", ["Dung tích không gian hình chiếm", "Diện tích mặt", "Chu vi", "Độ dài cạnh"], "Dung tích không gian hình chiếm", "Thể tích là đo lường 3D."], ["input", "1 lít = ? dm³", "1", "1 lít bằng 1 dm³."]],
  "g5_volume_cm_dm": [["input", "1 dm³ = ? cm³", "1000", "Nhân 10 mỗi chiều."], ["multiple_choice", "500 cm³ = ? dm³", ["0,5", "5", "50", "0,05"], "0,5", "Chia 1000."]],
  "g5_volume_m": [["input", "2 m³ = ? dm³", "2000", "1 m³ = 1000 dm³."], ["multiple_choice", "1 m³ = ? cm³", ["1000000", "1000", "10000", "100000"], "1000000", "10^6 cm³."]],
  "g5_practice_ch8": [["input", "3000 cm³ = ? dm³", "3", "Chia 1000."], ["multiple_choice", "0,002 m³ = ? dm³", ["2", "20", "0,2", "200"], "2", "Nhân 1000."]],
  "g5_nets": [["multiple_choice", "Hình lập phương có mấy mặt trong hình khai triển?", ["6", "4", "8", "12"], "6", "6 mặt vuông bằng nhau."], ["input", "Hình hộp chữ nhật có mấy mặt?", "6", "Gồm 6 mặt chữ nhật."]],
  "g5_box_surface": [["input", "Hộp 4×3×2 cm. S xung quanh?", "28", "Chu vi đáy (4+3)×2=14, × cao 2=28."], ["multiple_choice", "S toàn phần hộp = S xq + ?", ["2 × S đáy", "S đáy", "3 × S đáy", "Chu vi đáy"], "2 × S đáy", "Hai mặt đáy trên và dưới."]],
  "g5_cube_surface": [["input", "Lập phương cạnh 3 cm. S toàn phần?", "54", "6×3×3."], ["multiple_choice", "S 1 mặt lập phương cạnh a là?", ["a²", "4a", "6a²", "a³"], "a²", "Mặt là hình vuông."]],
  "g5_box_volume": [["input", "Hộp 5×4×3 cm. Thể tích?", "60", "5×4×3."], ["multiple_choice", "V hộp chữ nhật = ?", ["dài × rộng × cao", "dài + rộng + cao", "2(dài+rộng)×cao", "dài × rộng"], "dài × rộng × cao", "Nhân ba kích thước."]],
  "g5_cube_volume": [["input", "Lập phương cạnh 4 cm. V = ?", "64", "4×4×4."], ["multiple_choice", "Cạnh 5 cm thì V = ?", ["125 cm3", "25 cm3", "15 cm3", "75 cm3"], "125 cm3", "5³=125."]],
  "g5_volume_practice_exp": [["multiple_choice", "Thể tích hộp sữa 1 lít khoảng?", ["1 dm3", "1 cm3", "1 m3", "10 dm3"], "1 dm3", "1 lít = 1 dm³."], ["input", "Hộp 10×10×10 cm có V = ? cm³", "1000", "10³=1000=1 dm³."]],
  "g5_practice_ch9": [["input", "Hộp 6×2×3 cm. V = ?", "36", "6×2×3."], ["multiple_choice", "Lập phương cạnh 2 cm, S tp = ?", ["24 cm2", "8 cm2", "12 cm2", "6 cm2"], "24 cm2", "6×4=24."]],
  "g5_time_units": [["multiple_choice", "1 giờ = ? phút", ["60", "100", "30", "24"], "60", "1 giờ có 60 phút."], ["input", "2 giờ 15 phút = ? phút", "135", "2×60+15."]],
  "g5_time_add_sub": [["input", "1 giờ 40 phút + 35 phút = ? (viết dạng X giờ Y phút)", "2 giờ 15 phút", "75 phút = 1 giờ 15 phút."], ["multiple_choice", "2 giờ 10 phút - 45 phút = ?", ["1 giờ 25 phút", "1 giờ 35 phút", "1 giờ 15 phút", "55 phút"], "1 giờ 25 phút", "Quy về phút rồi trừ."]],
  "g5_time_mul_div": [["input", "40 phút × 3 = ? phút", "120", "40×3."], ["multiple_choice", "180 phút = ? giờ", ["3", "2,5", "4", "2"], "3", "180:60=3."]],
  "g5_speed": [["input", "Đi 120 km trong 3 giờ. Vận tốc?", "40", "120:3 km/h."], ["multiple_choice", "Công thức vận tốc?", ["v = s : t", "v = s × t", "v = t : s", "s = v : t"], "v = s : t", "Quãng đường chia thời gian."]],
  "g5_distance_time": [["input", "v = 50 km/h, t = 2 h. Quãng đường?", "100", "50×2."], ["multiple_choice", "s = 90 km, v = 30 km/h. t = ?", ["3 giờ", "30 giờ", "270 giờ", "0,3 giờ"], "3 giờ", "90:30=3."]],
  "g5_motion_practice_exp": [["input", "Xe 60 km/h đi 0,5 giờ. Quãng đường khoảng?", "30", "60×0,5."], ["multiple_choice", "Đơn vị vận tốc phổ biến trên đường?", ["km/h", "cm/phút", "m/ngày", "km/phút"], "km/h", "Km trên giờ."]],
  "g5_practice_ch10": [["input", "Đi 75 km với 25 km/h. Thời gian?", "3", "75:25 giờ."], ["multiple_choice", "2 giờ 30 phút = ? giờ (số thập phân)", ["2,5", "2,3", "2,05", "230"], "2,5", "30 phút = 0,5 giờ."]],
  "g5_data_collect": [["input", "Điểm: 7,8,6,9. Sắp xếp tăng dần, điểm cao nhất?", "9", "Sau sắp xếp: 6,7,8,9."], ["multiple_choice", "Thu thập dữ liệu là?", ["Ghi lại thông tin quan sát được", "Vẽ hình tròn", "Tính chu vi", "Giải phương trình"], "Ghi lại thông tin quan sát được", "Dữ liệu từ khảo sát, đo đếm."]],
  "g5_pie_chart": [["input", "25% trên quạt tròn = ? độ", "90", "25%×360=90."], ["multiple_choice", "Biểu đồ quạt tròn phù hợp biểu diễn?", ["Cơ cấu phần trăm", "Xu hướng thời gian", "Đo chiều cao", "Tính chu vi"], "Cơ cấu phần trăm", "Mỗi quạt là một phần trăm."]],
  "g5_probability_ratio": [["input", "Tung xu 20 lần, sấp 9 lần. Tỉ số sấp?", "9/20", "9 chia 20."], ["multiple_choice", "Gieo xúc xắc 30 lần, ra 5 được 6 lần. Tỉ số?", ["6/30", "5/30", "30/6", "1/30"], "6/30", "Số lần ra 5 chia tổng lần gieo."]],
  "g5_stats_practice_exp": [["multiple_choice", "40% trên quạt tròn = ? độ", ["144", "40", "360", "72"], "144", "40%×360=144."], ["input", "Có 20 bạn, 8 thích bóng rổ. Tỉ lệ?", "8/20", "8 chia 20."]],
  "g5_practice_ch11": [["input", "Tung xu 10 lần, ngửa 7 lần. Tỉ số ngửa?", "7/10", "7:10."], ["multiple_choice", "50% trên quạt tròn chiếm?", ["Nửa hình tròn", "1/4 hình tròn", "Toàn hình tròn", "1/8 hình tròn"], "Nửa hình tròn", "50% = 180°."]],
  "g5_review_numbers": [["multiple_choice", "3/4 = ?", ["0,75", "0,34", "3,4", "0,43"], "0,75", "3:4=0,75."], ["input", "Số lớn nhất: 67 245; 67 425; 67 524?", "67524", "So sánh từ hàng chục nghìn."]],
  "g5_review_ops": [["input", "12 + 8 : 2 = ?", "16", "Chia trước: 8:2=4, 12+4=16."], ["multiple_choice", "(3+5)×2 = ?", ["16", "11", "10", "13"], "16", "Ngoặc trước: 8×2."]],
  "g5_review_ratio_percent": [["input", "20% của 250?", "50", "250×0,2."], ["multiple_choice", "Tổng 45, tỉ số 2:7. Số lớn?", ["35", "10", "25", "30"], "35", "45:9×7."]],
  "g5_review_geometry": [["input", "Tam giác đáy 10, cao 8. Diện tích?", "40", "10×8:2."], ["multiple_choice", "Hình tròn r=4, C (3,14)?", ["25,12", "12,56", "50,24", "16"], "25,12", "2×3,14×4."]],
  "g5_review_measure_final": [["input", "3 dm³ = ? cm³", "3000", "×1000."], ["multiple_choice", "1 m³ = ? lít", ["1000", "1", "100", "10000"], "1000", "1 m³=1000 dm³=1000 lít."]],
  "g5_review_motion": [["input", "v=40 km/h, t=2,5 h. s=?", "100", "40×2,5."], ["multiple_choice", "s=60 km, t=2 h. v=?", ["30 km/h", "120 km/h", "62 km/h", "58 km/h"], "30 km/h", "60:2."]],
  "g5_review_stats": [["input", "Tung xu 50 lần, sấp 22 lần. Tỉ số?", "22/50", "22:50."], ["multiple_choice", "30% = ? độ trên quạt tròn", ["108", "30", "90", "120"], "108", "0,3×360."]],
  "g5_review_final": [["input", "2,5 + 1,75 = ?", "4,25", "Cộng số thập phân."], ["multiple_choice", "Hộp 3×4×5 cm, V = ?", ["60 cm3", "12 cm3", "35 cm3", "120 cm3"], "60 cm3", "3×4×5."]],
};

const errorPatterns = [
  ["g5_frac_add_sub_diff", "5/8", "denominator_error", "Cộng cả mẫu số", "Không cộng mẫu số với nhau.", "Quy đồng rồi cộng tử."],
  ["g5_mixed_number", "3 2/3", "mixed_number_error", "Chưa đổi hỗn số sang phân số", "Cần chuyển hỗn số trước khi tính.", "3 2/3 = 11/3."],
  ["g5_decimal_mul", "36", "decimal_point_error", "Quên dấu phẩy thập phân", "1,2×0,3=0,36 không phải 36.", "Đếm tổng chữ số thập phân."],
  ["g5_decimal_div", "0,8", "decimal_div_error", "Chia chưa đặt dấu phẩy", "4,8:0,6=8 không phải 0,8.", "Nhân 10 để bỏ dấu phẩy mẫu."],
  ["g5_triangle", "60", "triangle_area_error", "Quên chia 2", "Diện tích tam giác phải chia 2.", "S = đáy × cao : 2."],
  ["g5_trapezoid", "70", "trapezoid_error", "Chưa cộng hai đáy", "(8+12)×5=100, không phải 8×5.", "Cộng hai đáy trước khi nhân cao."],
  ["g5_circle", "31,4", "circle_formula_error", "Nhầm chu vi và diện tích", "31,4 là chu vi khi r=5, không phải diện tích.", "C = 2πr; S = πr²."],
  ["g5_area_units", "500", "area_unit_error", "Nhầm hệ số quy đổi", "1 ha = 10 000 m², không phải 1 000.", "Viết bảng quy đổi trước."],
  ["g5_percent_value", "25", "percent_error", "Nhầm 25% với 25", "25% của 80 là 20, không phải 25.", "Nhân với 25/100."],
  ["g5_sum_ratio", "20", "ratio_sum_error", "Chia sai tổng phần", "Tổng 48, tỉ số 1:3 thì số nhỏ là 12.", "Tổng : (m+n) × m."],
  ["g5_volume_cm_dm", "5", "volume_unit_error", "Nhầm cm³ và dm³", "500 cm³ = 0,5 dm³, không phải 5.", "Chia 1000 khi đổi cm³ sang dm³."],
  ["g5_box_volume", "26", "volume_formula_error", "Cộng thay vì nhân", "V = dài × rộng × cao, không phải cộng.", "Nhân ba kích thước."],
  ["g5_speed", "120", "speed_formula_error", "Nhầm công thức vận tốc", "v = s : t, không phải s × t khi tìm v.", "Quãng đường chia thời gian."],
  ["g5_time_add_sub", "75 phút", "time_error", "Chưa quy đổi giờ", "75 phút = 1 giờ 15 phút.", "60 phút = 1 giờ."],
  ["g5_probability_ratio", "9", "probability_error", "Thiếu mẫu số", "Tỉ số phải là 9/20, không chỉ 9.", "Viết số lần xảy ra trên tổng lần thử."],
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
    { type: "summary", title: "Ghi nhớ nhanh", content: summary }
  ];
}

function makeSkill(item, index) {
  const [id, title, chapter, description, visualization] = item;
  return {
    id,
    title,
    grade: 5,
    book: index < 35 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo: index + 1,
    domain: chapter,
    level: index < 25 ? 1 : index < 50 ? 2 : 3,
    prerequisite: index === 0 ? [] : [grade5[index - 1][0]],
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
    xp: 40 + Math.floor(index / 5) * 5,
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

function stripGrade5(items) {
  return items.filter((item) => {
    if (item.grade === 5) return false;
    const skillId = item.skill || item.id;
    return !(typeof skillId === "string" && skillId.startsWith("g5_"));
  });
}

const existingSkills = stripGrade5(await readJson(files.skills));
const existingLessons = stripGrade5(await readJson(files.lessons));
const existingQuestions = stripGrade5(await readJson(files.questions));
const existingErrors = stripGrade5(await readJson(files.errors));

const nextSkills = grade5.map(makeSkill);
const nextLessons = grade5.map(makeLesson);
const nextQuestions = grade5.flatMap(([id]) => makeQuestions(id));
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

console.log(`Added ${nextSkills.length} grade 5 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
