import { readFile, writeFile } from "node:fs/promises";

const files = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const grade7 = [
  ["g7_rational_set", "Bài 1. Tập hợp các số hữu tỉ", "Số hữu tỉ", "Nhận biết số hữu tỉ, biểu diễn trên trục số và so sánh các số hữu tỉ.", "numberLine"],
  ["g7_rational_ops", "Bài 2. Cộng, trừ, nhân, chia số hữu tỉ", "Số hữu tỉ", "Thực hiện bốn phép tính với số hữu tỉ, chú ý quy tắc dấu và quy đồng.", "fractionBar"],
  ["g7_rational_power", "Bài 3. Lũy thừa với số mũ tự nhiên của một số hữu tỉ", "Số hữu tỉ", "Tính lũy thừa của số hữu tỉ và vận dụng các quy tắc nhân, chia lũy thừa.", "power"],
  ["g7_ops_transfer", "Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế", "Số hữu tỉ", "Tính biểu thức nhiều bước và giải bài toán tìm x bằng quy tắc chuyển vế.", "equationBalance"],

  ["g7_repeating_decimal", "Bài 5. Làm quen với số thập phân vô hạn tuần hoàn", "Số thực", "Nhận biết số thập phân hữu hạn, vô hạn tuần hoàn và cách viết chu kì.", "numberLine"],
  ["g7_irrational_sqrt", "Bài 6. Số vô tỉ. Căn bậc hai số học", "Số thực", "Làm quen số vô tỉ và căn bậc hai số học của số không âm.", "concept"],
  ["g7_real_set", "Bài 7. Tập hợp các số thực", "Số thực", "Hiểu quan hệ giữa số hữu tỉ, số vô tỉ và số thực; so sánh, làm tròn số thực.", "numberLine"],

  ["g7_angles", "Bài 8. Góc ở vị trí đặc biệt. Tia phân giác của một góc", "Góc và đường thẳng song song", "Nhận biết góc kề bù, đối đỉnh và tia phân giác.", "angle"],
  ["g7_parallel_signs", "Bài 9. Hai đường thẳng song song và dấu hiệu nhận biết", "Góc và đường thẳng song song", "Dùng các cặp góc so le trong, đồng vị để nhận biết hai đường thẳng song song.", "angle"],
  ["g7_euclid_parallel", "Bài 10. Tiên đề Euclid. Tính chất hai đường thẳng song song", "Góc và đường thẳng song song", "Vận dụng tiên đề Euclid và tính chất góc khi hai đường thẳng song song.", "angle"],
  ["g7_theorem_proof", "Bài 11. Định lí và chứng minh định lí", "Góc và đường thẳng song song", "Phân biệt giả thiết, kết luận và trình bày chứng minh ngắn gọn.", "logic"],

  ["g7_triangle_sum", "Bài 12. Tổng các góc trong một tam giác", "Tam giác bằng nhau", "Vận dụng tổng ba góc của tam giác bằng 180 độ.", "triangle"],
  ["g7_triangle_sss", "Bài 13. Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất", "Tam giác bằng nhau", "Nhận biết hai tam giác bằng nhau theo trường hợp cạnh-cạnh-cạnh.", "triangle"],
  ["g7_triangle_sas_asa", "Bài 14. Trường hợp bằng nhau thứ hai và thứ ba của tam giác", "Tam giác bằng nhau", "Sử dụng cạnh-góc-cạnh và góc-cạnh-góc để chứng minh hai tam giác bằng nhau.", "triangle"],
  ["g7_right_triangle", "Bài 15. Các trường hợp bằng nhau của tam giác vuông", "Tam giác bằng nhau", "Nhận biết các trường hợp bằng nhau đặc biệt của tam giác vuông.", "triangle"],
  ["g7_isosceles_bisector", "Bài 16. Tam giác cân. Đường trung trực của đoạn thẳng", "Tam giác bằng nhau", "Vận dụng tính chất tam giác cân và đường trung trực.", "triangle"],

  ["g7_data_classify", "Bài 17. Thu thập và phân loại dữ liệu", "Thu thập và biểu diễn dữ liệu", "Xác định loại dữ liệu, thu thập và phân loại dữ liệu đúng mục đích.", "data"],
  ["g7_pie_chart", "Bài 18. Biểu đồ hình quạt tròn", "Thu thập và biểu diễn dữ liệu", "Đọc và biểu diễn cơ cấu phần trăm bằng biểu đồ hình quạt tròn.", "chart"],
  ["g7_line_chart", "Bài 19. Biểu đồ đoạn thẳng", "Thu thập và biểu diễn dữ liệu", "Đọc xu hướng tăng giảm của dữ liệu theo thời gian bằng biểu đồ đoạn thẳng.", "chart"],

  ["g7_proportion", "Bài 20. Tỉ lệ thức", "Tỉ lệ thức và đại lượng tỉ lệ", "Nhận biết tỉ lệ thức và vận dụng tính chất tích chéo.", "ratio"],
  ["g7_equal_ratios", "Bài 21. Tính chất của dãy tỉ số bằng nhau", "Tỉ lệ thức và đại lượng tỉ lệ", "Vận dụng dãy tỉ số bằng nhau để tìm các đại lượng chưa biết.", "ratio"],
  ["g7_direct_variation", "Bài 22. Đại lượng tỉ lệ thuận", "Tỉ lệ thức và đại lượng tỉ lệ", "Nhận biết và giải bài toán hai đại lượng tỉ lệ thuận.", "ratio"],
  ["g7_inverse_variation", "Bài 23. Đại lượng tỉ lệ nghịch", "Tỉ lệ thức và đại lượng tỉ lệ", "Nhận biết và giải bài toán hai đại lượng tỉ lệ nghịch.", "ratio"],

  ["g7_algebra_expr", "Bài 24. Biểu thức đại số", "Biểu thức đại số và đa thức một biến", "Viết, đọc và tính giá trị biểu thức đại số.", "algebra"],
  ["g7_polynomial_one_var", "Bài 25. Đa thức một biến", "Biểu thức đại số và đa thức một biến", "Nhận biết hệ số, bậc, hệ số cao nhất và hệ số tự do của đa thức một biến.", "algebra"],
  ["g7_poly_add_sub", "Bài 26. Phép cộng và phép trừ đa thức một biến", "Biểu thức đại số và đa thức một biến", "Thu gọn, sắp xếp và cộng trừ đa thức một biến.", "algebra"],
  ["g7_poly_multiply", "Bài 27. Phép nhân đa thức một biến", "Biểu thức đại số và đa thức một biến", "Nhân đơn thức với đa thức và nhân hai đa thức một biến.", "algebra"],
  ["g7_poly_divide", "Bài 28. Phép chia đa thức một biến", "Biểu thức đại số và đa thức một biến", "Chia đa thức một biến trong các trường hợp đơn giản.", "algebra"],

  ["g7_event_intro", "Bài 29. Làm quen với biến cố", "Làm quen với biến cố và xác suất", "Phân biệt biến cố chắc chắn, không thể và ngẫu nhiên.", "probability"],
  ["g7_probability_intro", "Bài 30. Làm quen với xác suất của biến cố", "Làm quen với biến cố và xác suất", "Tính xác suất trong các tình huống đơn giản có các kết quả đồng khả năng.", "probability"],

  ["g7_triangle_angle_side", "Bài 31. Quan hệ giữa góc và cạnh đối diện trong tam giác", "Quan hệ giữa các yếu tố trong tam giác", "Dùng quan hệ góc lớn đối diện cạnh lớn để so sánh cạnh, góc.", "triangle"],
  ["g7_perp_oblique", "Bài 32. Quan hệ giữa đường vuông góc và đường xiên", "Quan hệ giữa các yếu tố trong tam giác", "So sánh đường vuông góc, đường xiên và hình chiếu.", "triangle"],
  ["g7_triangle_inequality", "Bài 33. Quan hệ giữa ba cạnh của một tam giác", "Quan hệ giữa các yếu tố trong tam giác", "Kiểm tra ba độ dài có lập thành tam giác bằng bất đẳng thức tam giác.", "triangle"],
  ["g7_centroid_incenter", "Bài 34. Sự đồng quy của ba đường trung tuyến, ba đường phân giác", "Quan hệ giữa các yếu tố trong tam giác", "Nhận biết trọng tâm và giao điểm ba đường phân giác trong tam giác.", "triangle"],
  ["g7_circumcenter_orthocenter", "Bài 35. Sự đồng quy của ba đường trung trực, ba đường cao", "Quan hệ giữa các yếu tố trong tam giác", "Nhận biết tâm đường tròn ngoại tiếp và trực tâm của tam giác.", "triangle"],

  ["g7_box_cube", "Bài 36. Hình hộp chữ nhật và hình lập phương", "Một số hình khối trong thực tiễn", "Nhận biết, tính diện tích xung quanh và thể tích hình hộp chữ nhật, hình lập phương.", "solid"],
  ["g7_prism", "Bài 37. Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác", "Một số hình khối trong thực tiễn", "Nhận biết và tính thể tích, diện tích xung quanh của lăng trụ đứng.", "solid"]
];

const core = {
  g7_rational_set: ["Số hữu tỉ trên trục số", "Số hữu tỉ viết được dưới dạng a/b với b khác 0.", "-3/4 là số hữu tỉ và nằm giữa -1 và 0.", "Đưa số về phân số hoặc số thập phân để so sánh."],
  g7_rational_ops: ["Tính với phân số có dấu", "Quy đồng khi cộng trừ; nhân chia theo quy tắc phân số.", "-1/2 + 3/4 = 1/4.", "Xử lí dấu trước, rồi tính phần giá trị."],
  g7_rational_power: ["Lũy thừa số hữu tỉ", "Cơ số hữu tỉ được nhân lặp theo số mũ tự nhiên.", "(-2/3)^2 = 4/9.", "Nếu số mũ chẵn, lũy thừa của số âm là dương."],
  g7_ops_transfer: ["Chuyển vế đổi dấu", "Khi chuyển một hạng tử qua vế kia của đẳng thức, ta đổi dấu hạng tử đó.", "x + 5 = 12 nên x = 12 - 5 = 7.", "Làm gọn biểu thức trước khi tìm x."],
  g7_repeating_decimal: ["Chu kì lặp", "Số thập phân vô hạn tuần hoàn có một nhóm chữ số lặp mãi.", "0,333... có chu kì 3.", "Nhận ra phần lặp để viết gọn."],
  g7_irrational_sqrt: ["Căn bậc hai số học", "Căn bậc hai số học của a không âm là số không âm có bình phương bằng a.", "Căn bậc hai số học của 25 là 5.", "Chỉ số không âm mới có căn bậc hai số học trong chương trình này."],
  g7_real_set: ["Bức tranh số thực", "Số thực gồm số hữu tỉ và số vô tỉ.", "Căn 2 là số vô tỉ nhưng vẫn là số thực.", "Mỗi số thực ứng với một điểm trên trục số."],
  g7_angles: ["Góc đặc biệt", "Góc đối đỉnh bằng nhau; hai góc kề bù có tổng 180 độ.", "Nếu hai góc kề bù, một góc 65 độ thì góc kia 115 độ.", "Tia phân giác chia góc thành hai góc bằng nhau."],
  g7_parallel_signs: ["Dấu hiệu song song", "Nếu một cặp góc so le trong bằng nhau thì hai đường thẳng song song.", "Hai góc so le trong cùng bằng 70 độ cho biết hai đường thẳng song song.", "Xác định đúng cặp góc trước khi kết luận."],
  g7_euclid_parallel: ["Qua một điểm chỉ có một đường song song", "Tiên đề Euclid giúp suy luận duy nhất đường thẳng song song qua một điểm ngoài đường thẳng.", "Nếu a song song b, góc đồng vị bằng nhau.", "Song song tạo ra các cặp góc bằng nhau hoặc bù nhau."],
  g7_theorem_proof: ["Giả thiết đến kết luận", "Một định lí gồm phần đã cho và điều cần chứng minh.", "Nếu hai góc đối đỉnh thì chúng bằng nhau.", "Viết rõ GT, KL trước khi chứng minh."],
  g7_triangle_sum: ["Tổng góc 180 độ", "Ba góc trong một tam giác luôn có tổng 180 độ.", "Tam giác có hai góc 50 độ và 60 độ thì góc còn lại 70 độ.", "Lấy 180 trừ tổng hai góc đã biết."],
  g7_triangle_sss: ["Cạnh-cạnh-cạnh", "Ba cạnh tương ứng bằng nhau thì hai tam giác bằng nhau.", "AB = DE, BC = EF, CA = FD thì tam giác ABC bằng DEF.", "Ghép đúng cặp đỉnh tương ứng."],
  g7_triangle_sas_asa: ["Cạnh-góc-cạnh và góc-cạnh-góc", "Hai cạnh và góc xen giữa, hoặc một cạnh và hai góc kề tương ứng bằng nhau, đủ để kết luận bằng nhau.", "SAS cần góc nằm giữa hai cạnh đã biết.", "Kiểm tra vị trí của góc."],
  g7_right_triangle: ["Tam giác vuông", "Tam giác vuông có các trường hợp bằng nhau rút gọn nhờ góc vuông.", "Hai cạnh góc vuông tương ứng bằng nhau thì hai tam giác vuông bằng nhau.", "Nhận diện cạnh huyền và cạnh góc vuông."],
  g7_isosceles_bisector: ["Tam giác cân", "Tam giác cân có hai cạnh bên bằng nhau và hai góc ở đáy bằng nhau.", "Nếu AB = AC thì góc B bằng góc C.", "Đường trung trực gồm các điểm cách đều hai đầu đoạn thẳng."],
  g7_data_classify: ["Dữ liệu đúng loại", "Dữ liệu định tính mô tả nhóm; dữ liệu định lượng là số đo hoặc số đếm.", "Màu yêu thích là định tính; chiều cao là định lượng.", "Phân loại dữ liệu trước khi chọn biểu đồ."],
  g7_pie_chart: ["Cơ cấu phần trăm", "Biểu đồ quạt tròn biểu diễn các phần của một tổng thể.", "25% tương ứng với 90 độ của hình tròn.", "Góc quạt = phần trăm · 360 độ."],
  g7_line_chart: ["Xu hướng theo thời gian", "Biểu đồ đoạn thẳng nối các điểm dữ liệu theo thứ tự thời gian.", "Đường đi lên cho thấy số liệu tăng.", "Đọc trục ngang là thời gian, trục dọc là giá trị."],
  g7_proportion: ["Tỉ lệ thức", "Tỉ lệ thức là đẳng thức của hai tỉ số.", "2/3 = 4/6 là một tỉ lệ thức.", "Tích chéo bằng nhau là dấu hiệu quan trọng."],
  g7_equal_ratios: ["Dãy tỉ số bằng nhau", "Nếu a/b = c/d thì có thể dùng tính chất để tìm các số chưa biết.", "x/2 = y/3 và x+y=10 thì x=4, y=6.", "Tổng các phần tỉ lệ giúp tìm một phần."],
  g7_direct_variation: ["Cùng tăng cùng giảm", "Hai đại lượng tỉ lệ thuận có thương y/x không đổi.", "Giá tiền tỉ lệ thuận với số kg hàng.", "Tìm hệ số tỉ lệ trước."],
  g7_inverse_variation: ["Một tăng một giảm", "Hai đại lượng tỉ lệ nghịch có tích x·y không đổi.", "Cùng một quãng đường, vận tốc tăng thì thời gian giảm.", "Giữ tích không đổi."],
  g7_algebra_expr: ["Chữ thay cho số", "Biểu thức đại số dùng chữ để đại diện cho số.", "Với x=3, 2x+5 = 11.", "Thay giá trị rồi tính theo thứ tự phép tính."],
  g7_polynomial_one_var: ["Đa thức một biến", "Đa thức một biến là tổng các đơn thức cùng một biến.", "P(x)=3x^2-2x+1 có bậc 2.", "Bậc là số mũ lớn nhất có hệ số khác 0."],
  g7_poly_add_sub: ["Gộp hạng tử đồng dạng", "Cộng trừ đa thức bằng cách cộng trừ hệ số của các hạng tử cùng bậc.", "(2x^2+3x) + (x^2-x) = 3x^2+2x.", "Sắp xếp theo bậc để tránh sót hạng tử."],
  g7_poly_multiply: ["Nhân phân phối", "Nhân đa thức bằng cách nhân từng hạng tử rồi thu gọn.", "x(x+2)=x^2+2x.", "Phân phối cho tất cả hạng tử trong ngoặc."],
  g7_poly_divide: ["Chia theo bậc giảm dần", "Chia đa thức một biến bắt đầu từ hạng tử bậc cao nhất.", "(x^2+3x)/x = x+3.", "Kiểm tra bằng phép nhân thương với đa thức chia."],
  g7_event_intro: ["Biến cố", "Biến cố là điều có thể xảy ra hoặc không xảy ra trong phép thử.", "Tung xúc xắc ra số 7 là biến cố không thể.", "Xác định không gian kết quả trước."],
  g7_probability_intro: ["Tỉ lệ khả năng", "Xác suất bằng số kết quả thuận lợi chia số kết quả có thể khi đồng khả năng.", "Xác suất tung xúc xắc ra số chẵn là 3/6 = 1/2.", "Đếm kết quả thuận lợi và tổng kết quả."],
  g7_triangle_angle_side: ["Góc lớn cạnh lớn", "Trong tam giác, góc lớn hơn đối diện cạnh dài hơn.", "Góc A lớn nhất thì cạnh BC dài nhất.", "So sánh đúng cặp góc và cạnh đối diện."],
  g7_perp_oblique: ["Đường vuông góc ngắn nhất", "Từ một điểm đến một đường thẳng, đoạn vuông góc là ngắn nhất.", "Khoảng cách từ điểm đến đường là độ dài đoạn vuông góc.", "Đường xiên dài hơn hình chiếu tương ứng nếu hình chiếu dài hơn."],
  g7_triangle_inequality: ["Bất đẳng thức tam giác", "Tổng hai cạnh bất kì của tam giác lớn hơn cạnh còn lại.", "3, 4, 5 lập thành tam giác vì 3+4>5.", "Chỉ cần kiểm tra tổng hai cạnh nhỏ hơn có lớn hơn cạnh lớn nhất không."],
  g7_centroid_incenter: ["Các đường đồng quy", "Ba trung tuyến đồng quy tại trọng tâm; ba phân giác đồng quy tại tâm nội tiếp.", "Trọng tâm nằm trên mỗi trung tuyến.", "Nhớ đường trung tuyến đi từ đỉnh đến trung điểm cạnh đối diện."],
  g7_circumcenter_orthocenter: ["Tâm ngoại tiếp và trực tâm", "Ba trung trực đồng quy tại tâm ngoại tiếp; ba đường cao đồng quy tại trực tâm.", "Tâm ngoại tiếp cách đều ba đỉnh tam giác.", "Đường cao vuông góc với cạnh đối diện."],
  g7_box_cube: ["Khối hộp", "Hình hộp chữ nhật có 6 mặt là hình chữ nhật; hình lập phương có 6 mặt là hình vuông.", "Thể tích hộp chữ nhật bằng dài · rộng · cao.", "Dùng đúng đơn vị khối cho thể tích."],
  g7_prism: ["Lăng trụ đứng", "Lăng trụ đứng có hai đáy song song bằng nhau và các mặt bên là hình chữ nhật.", "Thể tích lăng trụ bằng diện tích đáy nhân chiều cao.", "Xác định đáy trước khi tính."]
};

const questions = {
  g7_rational_set: [["multiple_choice", "Số nào là số hữu tỉ?", ["-3/5", "sqrt(2)", "pi", "sqrt(3)"], "-3/5", "Số hữu tỉ viết được dạng a/b với b khác 0."], ["input", "Số đối của -7/4 là gì?", "7/4", "Hai số đối nhau có tổng bằng 0."]],
  g7_rational_ops: [["input", "Tính -1/2 + 3/4.", "1/4", "Quy đồng mẫu 4."], ["multiple_choice", "(-2/3) · (9/4) bằng bao nhiêu?", ["-3/2", "3/2", "-18/7", "2/3"], "-3/2", "Rút gọn 9 với 3, rồi nhân."]],
  g7_rational_power: [["input", "Tính (-2/3)^2.", "4/9", "Số mũ chẵn cho kết quả dương."], ["multiple_choice", "(1/2)^3 bằng bao nhiêu?", ["1/8", "3/2", "1/6", "8"], "1/8", "Nhân 1/2 ba lần."]],
  g7_ops_transfer: [["input", "Giải x + 5 = 12. x = ?", "7", "Chuyển 5 sang vế phải thành -5."], ["multiple_choice", "Trong 3x = 15, x bằng bao nhiêu?", ["5", "12", "18", "45"], "5", "Chia hai vế cho 3."]],
  g7_repeating_decimal: [["multiple_choice", "0,333... có chu kì là gì?", ["3", "33", "0", "3333"], "3", "Nhóm chữ số lặp lại là 3."], ["input", "1/3 viết dưới dạng thập phân tuần hoàn là 0,... Điền chu kì.", "3", "1 chia 3 được 0,333..."]],
  g7_irrational_sqrt: [["input", "Căn bậc hai số học của 49 là bao nhiêu?", "7", "7^2 = 49 và 7 không âm."], ["multiple_choice", "Số nào là số vô tỉ?", ["sqrt(2)", "1/2", "-3", "0,75"], "sqrt(2)", "sqrt(2) không viết được dưới dạng phân số."]],
  g7_real_set: [["multiple_choice", "Tập số thực gồm những số nào?", ["Số hữu tỉ và số vô tỉ", "Chỉ số tự nhiên", "Chỉ số nguyên", "Chỉ phân số"], "Số hữu tỉ và số vô tỉ", "Số thực là bức tranh rộng hơn."], ["input", "Làm tròn 3,141 đến hàng phần trăm.", "3,14", "Nhìn chữ số hàng phần nghìn là 1."]],
  g7_angles: [["input", "Hai góc kề bù, một góc 65 độ. Góc còn lại bao nhiêu độ?", "115", "Tổng hai góc kề bù là 180 độ."], ["multiple_choice", "Tia phân giác của góc 80 độ tạo hai góc bao nhiêu độ?", ["40 và 40", "30 và 50", "80 và 80", "20 và 60"], "40 và 40", "Phân giác chia góc thành hai phần bằng nhau."]],
  g7_parallel_signs: [["multiple_choice", "Nếu hai góc so le trong bằng nhau thì hai đường thẳng đó như thế nào?", ["Song song", "Vuông góc", "Cắt nhau tại trung điểm", "Trùng điểm"], "Song song", "Đây là dấu hiệu nhận biết song song."], ["input", "Hai góc đồng vị bằng nhau: kết luận hai đường thẳng là gì?", "song song", "Góc đồng vị bằng nhau là dấu hiệu song song."]],
  g7_euclid_parallel: [["multiple_choice", "Qua một điểm nằm ngoài một đường thẳng, có bao nhiêu đường thẳng song song với đường thẳng đó?", ["1", "2", "0", "Vô số"], "1", "Đây là nội dung tiên đề Euclid."], ["input", "Nếu a song song b và một góc đồng vị bằng 70 độ, góc đồng vị còn lại bằng bao nhiêu độ?", "70", "Góc đồng vị bằng nhau."]],
  g7_theorem_proof: [["multiple_choice", "Trong định lí, phần đã cho gọi là gì?", ["Giả thiết", "Kết luận", "Ví dụ", "Hình vẽ"], "Giả thiết", "Giả thiết là điều được biết."], ["input", "Viết tắt thường dùng của kết luận là gì?", "KL", "Trong hình học hay ghi GT và KL."]],
  g7_triangle_sum: [["input", "Tam giác có hai góc 50 và 60 độ. Góc còn lại là bao nhiêu độ?", "70", "Lấy 180 - 50 - 60."], ["multiple_choice", "Tổng ba góc trong tam giác bằng bao nhiêu?", ["180 độ", "90 độ", "360 độ", "120 độ"], "180 độ", "Định lí tổng ba góc tam giác."]],
  g7_triangle_sss: [["multiple_choice", "Ba cạnh tương ứng bằng nhau là trường hợp nào?", ["c.c.c", "g.g.g", "c.g.g", "g.c"], "c.c.c", "Cạnh-cạnh-cạnh."], ["input", "Nếu AB=DE, BC=EF, CA=FD thì tam giác ABC bằng tam giác nào?", "DEF", "Ghép đúng thứ tự đỉnh tương ứng."]],
  g7_triangle_sas_asa: [["multiple_choice", "Cạnh-góc-cạnh yêu cầu góc nằm ở đâu?", ["Xen giữa hai cạnh", "Ngoài tam giác", "Bất kì", "Đối diện cạnh nhỏ"], "Xen giữa hai cạnh", "Góc phải là góc tạo bởi hai cạnh đã biết."], ["input", "Viết tắt trường hợp góc-cạnh-góc bằng chữ cái.", "g.c.g", "Góc-cạnh-góc."]],
  g7_right_triangle: [["multiple_choice", "Tam giác vuông có cạnh đối diện góc vuông gọi là gì?", ["Cạnh huyền", "Cạnh đáy", "Trung tuyến", "Đường cao"], "Cạnh huyền", "Cạnh huyền là cạnh dài nhất của tam giác vuông."], ["input", "Hai tam giác vuông có hai cạnh góc vuông tương ứng bằng nhau thì chúng có bằng nhau không? Trả lời có/không.", "có", "Đó là một trường hợp bằng nhau của tam giác vuông."]],
  g7_isosceles_bisector: [["input", "Tam giác cân có hai góc ở đáy 50 độ. Góc ở đỉnh bằng bao nhiêu độ?", "80", "180 - 50 - 50."], ["multiple_choice", "Điểm nằm trên đường trung trực của AB thì có tính chất gì?", ["Cách đều A và B", "Nằm giữa A và B", "Trùng A", "Luôn ở ngoài tam giác"], "Cách đều A và B", "Đường trung trực là tập hợp điểm cách đều hai đầu đoạn thẳng."]],
  g7_data_classify: [["multiple_choice", "Chiều cao học sinh là loại dữ liệu nào?", ["Định lượng", "Định tính", "Không phải dữ liệu", "Biến cố"], "Định lượng", "Chiều cao là số đo."], ["input", "Dữ liệu màu sắc yêu thích là định tính hay định lượng?", "định tính", "Màu sắc là nhóm mô tả."]],
  g7_pie_chart: [["input", "25% của hình tròn tương ứng bao nhiêu độ?", "90", "25% của 360 là 90."], ["multiple_choice", "Biểu đồ quạt tròn phù hợp để biểu diễn gì?", ["Cơ cấu phần trăm", "Đường thẳng song song", "Thể tích hộp", "Tam giác cân"], "Cơ cấu phần trăm", "Mỗi quạt là một phần của tổng thể."]],
  g7_line_chart: [["multiple_choice", "Biểu đồ đoạn thẳng thường dùng để biểu diễn gì?", ["Xu hướng theo thời gian", "Tỉ lệ thức", "Cạnh tam giác", "Góc đối đỉnh"], "Xu hướng theo thời gian", "Các điểm dữ liệu được nối theo thứ tự thời gian."], ["input", "Tháng 1 có 20, tháng 2 có 35. Mức tăng là bao nhiêu?", "15", "35 - 20."]],
  g7_proportion: [["multiple_choice", "2/3 = 4/6 có phải tỉ lệ thức không?", ["Có", "Không"], "Có", "Hai tỉ số bằng nhau."], ["input", "Trong tỉ lệ thức 2/5 = x/10, x bằng bao nhiêu?", "4", "Nhân chéo hoặc nhận ra mẫu gấp đôi."]],
  g7_equal_ratios: [["input", "x/2 = 6/3 thì x bằng bao nhiêu?", "4", "6/3 = 2 nên x/2 = 2."], ["multiple_choice", "Nếu x:y = 2:3 và x+y=10 thì x bằng?", ["4", "6", "5", "2"], "4", "Tổng phần là 5, mỗi phần là 2."]],
  g7_direct_variation: [["input", "Nếu y tỉ lệ thuận với x, y=12 khi x=3. Hệ số tỉ lệ là bao nhiêu?", "4", "k = y/x."], ["multiple_choice", "Mua 2 kg hết 30 nghìn, 4 kg hết bao nhiêu nếu tỉ lệ thuận?", ["60 nghìn", "15 nghìn", "34 nghìn", "120 nghìn"], "60 nghìn", "Gấp đôi số kg thì gấp đôi tiền."]],
  g7_inverse_variation: [["input", "x và y tỉ lệ nghịch, x=4, y=6. Tích không đổi bằng bao nhiêu?", "24", "Tỉ lệ nghịch có x·y không đổi."], ["multiple_choice", "Cùng công việc, số người tăng thì thời gian thường thế nào?", ["Giảm", "Tăng", "Không đổi luôn", "Không xác định"], "Giảm", "Đây là tình huống tỉ lệ nghịch thường gặp."]],
  g7_algebra_expr: [["input", "Với x=3, tính 2x+5.", "11", "Thay x=3 rồi tính."], ["multiple_choice", "Biểu thức nào là biểu thức đại số?", ["3x + 2", "Hôm nay", "Tam giác", "Đường thẳng d"], "3x + 2", "Có số, chữ và phép toán."]],
  g7_polynomial_one_var: [["input", "Bậc của P(x)=3x^2-2x+1 là bao nhiêu?", "2", "Số mũ lớn nhất là 2."], ["multiple_choice", "Hệ số tự do của x^3 - 4x + 7 là gì?", ["7", "1", "-4", "3"], "7", "Hệ số tự do không chứa x."]],
  g7_poly_add_sub: [["input", "Thu gọn: (2x + 3x).", "5x", "Cộng hệ số của hạng tử đồng dạng."], ["multiple_choice", "(x^2+2x) + (3x^2-x) bằng?", ["4x^2+x", "4x^2+3x", "3x^4+x", "x^2+x"], "4x^2+x", "Gộp x^2 với x^2, x với x."]],
  g7_poly_multiply: [["input", "Khai triển x(x+3).", "x^2+3x", "Nhân x với từng hạng tử."], ["multiple_choice", "2x · 3x bằng?", ["6x^2", "5x", "6x", "5x^2"], "6x^2", "Nhân hệ số và nhân phần biến."]],
  g7_poly_divide: [["input", "Chia 6x^2 cho 3x được gì?", "2x", "6/3=2 và x^2/x=x."], ["multiple_choice", "(x^2+3x) : x bằng?", ["x+3", "x^2+3", "3x", "x-3"], "x+3", "Chia từng hạng tử cho x."]],
  g7_event_intro: [["multiple_choice", "Tung xúc xắc ra số 7 là biến cố gì?", ["Không thể", "Chắc chắn", "Ngẫu nhiên", "Đồng khả năng"], "Không thể", "Xúc xắc thường chỉ có 1 đến 6."], ["input", "Tung đồng xu ra mặt sấp là biến cố chắc chắn, không thể hay ngẫu nhiên?", "ngẫu nhiên", "Có thể xảy ra hoặc không xảy ra."]],
  g7_probability_intro: [["input", "Tung xúc xắc, xác suất ra số chẵn là bao nhiêu?", "1/2", "Có 3 số chẵn trong 6 kết quả."], ["multiple_choice", "Xác suất biến cố chắc chắn bằng bao nhiêu?", ["1", "0", "1/2", "2"], "1", "Chắc chắn xảy ra có xác suất 1."]],
  g7_triangle_angle_side: [["multiple_choice", "Trong tam giác, góc lớn hơn đối diện với cạnh thế nào?", ["Dài hơn", "Ngắn hơn", "Bằng 0", "Không liên quan"], "Dài hơn", "Góc lớn đối diện cạnh lớn."], ["input", "Nếu góc A lớn nhất thì cạnh đối diện góc A là cạnh nào trong tam giác ABC?", "BC", "Cạnh đối diện A là BC."]],
  g7_perp_oblique: [["multiple_choice", "Từ một điểm đến một đường thẳng, đoạn nào ngắn nhất?", ["Đường vuông góc", "Đường xiên bất kì", "Đường cong", "Cạnh đáy"], "Đường vuông góc", "Khoảng cách là đoạn vuông góc."], ["input", "Đường vuông góc tạo với đường thẳng một góc bao nhiêu độ?", "90", "Vuông góc nghĩa là 90 độ."]],
  g7_triangle_inequality: [["multiple_choice", "Ba độ dài nào lập thành tam giác?", ["3,4,5", "1,2,3", "2,2,5", "1,1,3"], "3,4,5", "Tổng hai cạnh nhỏ hơn phải lớn hơn cạnh lớn nhất."], ["input", "Với tam giác có hai cạnh 4 và 7, cạnh thứ ba x phải nhỏ hơn bao nhiêu?", "11", "x < 4 + 7."]],
  g7_centroid_incenter: [["multiple_choice", "Ba đường trung tuyến đồng quy tại đâu?", ["Trọng tâm", "Trực tâm", "Tâm ngoại tiếp", "Một đỉnh"], "Trọng tâm", "Trọng tâm là giao điểm ba trung tuyến."], ["input", "Đường trung tuyến đi từ đỉnh đến điểm nào của cạnh đối diện?", "trung điểm", "Trung tuyến nối đỉnh với trung điểm cạnh đối diện."]],
  g7_circumcenter_orthocenter: [["multiple_choice", "Ba đường cao đồng quy tại đâu?", ["Trực tâm", "Trọng tâm", "Tâm nội tiếp", "Một cạnh"], "Trực tâm", "Trực tâm là giao điểm ba đường cao."], ["input", "Tâm ngoại tiếp cách đều mấy đỉnh của tam giác?", "3", "Nó cách đều cả ba đỉnh."]],
  g7_box_cube: [["input", "Thể tích hình hộp chữ nhật dài 4, rộng 3, cao 2 là bao nhiêu?", "24", "V = dài · rộng · cao."], ["multiple_choice", "Hình lập phương có bao nhiêu mặt?", ["6", "4", "8", "12"], "6", "Có 6 mặt đều là hình vuông."]],
  g7_prism: [["multiple_choice", "Thể tích lăng trụ đứng bằng gì?", ["Diện tích đáy nhân chiều cao", "Chu vi đáy nhân chiều cao", "Cạnh nhân 4", "Tổng hai đáy"], "Diện tích đáy nhân chiều cao", "V = S đáy · h."], ["input", "Lăng trụ đứng có hai đáy song song và như thế nào với nhau?", "bằng nhau", "Hai đáy là hai đa giác bằng nhau."]]
};

const errorPatterns = [
  ["g7_rational_ops", "-5/4", "sign_error", "Sai dấu khi cộng số hữu tỉ", "Bạn đang cộng độ lớn mà chưa xét dấu.", "Quy đồng rồi cộng các tử có dấu."],
  ["g7_ops_transfer", "17", "transfer_error", "Chuyển vế chưa đổi dấu", "Khi chuyển +5 sang vế kia phải thành -5.", "x + 5 = 12 nên x = 12 - 5."],
  ["g7_irrational_sqrt", "-7", "sqrt_error", "Căn bậc hai số học không âm", "Căn bậc hai số học luôn là số không âm.", "sqrt(49) = 7."],
  ["g7_angles", "125", "angle_sum_error", "Nhầm tổng góc kề bù", "Hai góc kề bù có tổng 180 độ.", "Lấy 180 trừ góc đã biết."],
  ["g7_triangle_sum", "110", "triangle_angle_error", "Quên tổng ba góc tam giác", "Ba góc trong tam giác có tổng 180 độ.", "Cộng hai góc đã biết rồi trừ khỏi 180."],
  ["g7_pie_chart", "25", "percent_angle_error", "Nhầm phần trăm với số đo góc", "25% của hình tròn không phải 25 độ.", "Tính 25% của 360 độ."],
  ["g7_proportion", "5", "proportion_error", "Nhân chéo chưa đúng", "Tỉ lệ thức cần giữ hai tích chéo bằng nhau.", "2/5 = x/10 nên 5x = 20."],
  ["g7_algebra_expr", "8", "substitution_error", "Thay giá trị nhưng tính thiếu bước", "Với x=3, 2x là 6, rồi cộng 5.", "Thay chữ bằng số trong ngoặc nếu cần."],
  ["g7_poly_multiply", "x^2+3", "distribution_error", "Quên phân phối với biến", "x nhân với 3 tạo thành 3x, không phải 3.", "Nhân x với từng hạng tử trong ngoặc."],
  ["g7_probability_intro", "3/6", "not_simplified", "Có thể rút gọn xác suất", "3/6 đúng về đếm nhưng nên rút gọn thành 1/2.", "Chia cả tử và mẫu cho 3."],
  ["g7_triangle_inequality", "11", "triangle_inequality_error", "Điều kiện phải là nhỏ hơn, không bằng", "Tổng hai cạnh phải lớn hơn cạnh còn lại.", "Nếu x = 11 thì ba đoạn thẳng nằm thẳng hàng, không tạo tam giác."],
  ["g7_box_cube", "9", "volume_formula_error", "Nhầm diện tích đáy với thể tích", "Thể tích hình hộp cần nhân thêm chiều cao.", "V = dài · rộng · cao."]
];

function makeLesson([id, title, chapter, description, visualization]) {
  const [visualTitle, visualContent, example, summary] = core[id];
  const no = Number(title.match(/Bài (\d+)/)?.[1] || 1);
  return {
    id,
    title,
    skill: id,
    chapter,
    source: "Bám mạch SGK Toán 7 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.",
    xp: no < 12 ? 60 : no < 24 ? 70 : 80,
    steps: [
      { type: "intro", title: "Mục tiêu vi kỹ năng", content: description },
      { type: "visualization", title: visualTitle, content: visualContent, visualization },
      { type: "example", title: "Ví dụ tự tạo", content: example },
      { type: "summary", title: "Ghi nhớ nhanh", content: summary }
    ]
  };
}

function makeSkill(item, index) {
  const [id, title, chapter, description, visualization] = item;
  const chapterNames = [...new Set(grade7.map((lesson) => lesson[2]))];
  const no = Number(title.match(/Bài (\d+)/)?.[1] || index + 1);
  return {
    id,
    title,
    grade: 7,
    book: no <= 19 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapterNames.indexOf(chapter) + 1,
    lessonNo: no,
    domain: chapter,
    level: no < 12 ? 2 : no < 24 ? 3 : 4,
    prerequisite: index === 0 ? [] : [grade7[index - 1][0]],
    description,
    visualization
  };
}

function makeQuestions(id) {
  return questions[id].map(([type, question, choicesOrAnswer, answerOrHint, maybeHint], index) => {
    const isChoice = type === "multiple_choice";
    return {
      id: `q_${id}_${index + 1}`,
      skill: id,
      type,
      question,
      ...(isChoice ? { choices: choicesOrAnswer, answer: answerOrHint, hint: maybeHint } : { answer: choicesOrAnswer, hint: answerOrHint })
    };
  });
}

function mergeById(existing, incoming) {
  const existingIds = new Set(existing.map((item) => item.id));
  return [...existing.filter((item) => !incoming.some((next) => next.id === item.id)), ...incoming.filter((item) => !existingIds.has(item.id))];
}

const skills = await readJson(files.skills);
const lessons = await readJson(files.lessons);
const existingQuestions = await readJson(files.questions);
const errors = await readJson(files.errors);

const nextSkills = grade7.map(makeSkill);
const nextLessons = grade7.map(makeLesson);
const nextQuestions = grade7.flatMap(([id]) => makeQuestions(id));
const nextErrors = errorPatterns.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

await writeFile(files.skills, `${JSON.stringify(mergeById(skills, nextSkills), null, 2)}\n`);
await writeFile(files.lessons, `${JSON.stringify(mergeById(lessons, nextLessons), null, 2)}\n`);
await writeFile(files.questions, `${JSON.stringify(mergeById(existingQuestions, nextQuestions), null, 2)}\n`);
await writeFile(files.errors, `${JSON.stringify([...errors.filter((item) => !nextErrors.some((next) => next.skill === item.skill && next.pattern === item.pattern)), ...nextErrors], null, 2)}\n`);

console.log(`Added ${nextSkills.length} grade 7 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
