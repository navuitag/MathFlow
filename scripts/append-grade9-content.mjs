import { readFile, writeFile } from "node:fs/promises";
import { makeKeypointsStepFromCore } from "./lesson-keypoints.mjs";

const paths = {
  skills: "data/skills.json",
  lessons: "data/lessons.json",
  questions: "data/questions.json",
  errors: "data/errors.json"
};

const grade9 = [
  ["g9_linear_system_intro", "Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn", "Phương trình và hệ hai phương trình bậc nhất hai ẩn", "Nhận biết phương trình bậc nhất hai ẩn, nghiệm và hệ hai phương trình bậc nhất hai ẩn.", "system"],
  ["g9_solve_linear_system", "Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn", "Phương trình và hệ hai phương trình bậc nhất hai ẩn", "Giải hệ bằng phương pháp thế, cộng đại số và kiểm tra nghiệm.", "system"],
  ["g9_word_system", "Bài 3. Giải bài toán bằng cách lập hệ phương trình", "Phương trình và hệ hai phương trình bậc nhất hai ẩn", "Chọn hai ẩn, lập hệ phương trình và giải bài toán thực tế.", "system"],
  ["g9_equation_transform", "Bài 4. Phương trình quy về phương trình bậc nhất một ẩn", "Phương trình và bất phương trình bậc nhất một ẩn", "Biến đổi phương trình chứa ngoặc, mẫu hoặc tích về phương trình bậc nhất.", "equationBalance"],
  ["g9_inequality_properties", "Bài 5. Bất đẳng thức và tính chất", "Phương trình và bất phương trình bậc nhất một ẩn", "Vận dụng tính chất cộng, nhân hai vế của bất đẳng thức.", "inequality"],
  ["g9_linear_inequality", "Bài 6. Bất phương trình bậc nhất một ẩn", "Phương trình và bất phương trình bậc nhất một ẩn", "Giải bất phương trình bậc nhất một ẩn và biểu diễn nghiệm.", "inequality"],
  ["g9_square_root_expr", "Bài 7. Căn bậc hai và căn thức bậc hai", "Căn bậc hai và căn bậc ba", "Nhận biết căn bậc hai, căn thức bậc hai và điều kiện xác định.", "radical"],
  ["g9_sqrt_product_quotient", "Bài 8. Khai căn bậc hai với phép nhân và phép chia", "Căn bậc hai và căn bậc ba", "Vận dụng quy tắc khai căn của tích và thương.", "radical"],
  ["g9_sqrt_simplify", "Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai", "Căn bậc hai và căn bậc ba", "Đưa thừa số ra ngoài dấu căn, khử mẫu và rút gọn biểu thức chứa căn.", "radical"],
  ["g9_cube_root_expr", "Bài 10. Căn bậc ba và căn thức bậc ba", "Căn bậc hai và căn bậc ba", "Nhận biết căn bậc ba, căn thức bậc ba và tính giá trị căn bậc ba.", "radical"],
  ["g9_trig_ratios", "Bài 11. Tỉ số lượng giác của góc nhọn", "Hệ thức lượng trong tam giác vuông", "Hiểu sin, cos, tan, cot của góc nhọn trong tam giác vuông.", "triangle"],
  ["g9_right_triangle_relations", "Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng", "Hệ thức lượng trong tam giác vuông", "Tính cạnh, góc trong tam giác vuông bằng tỉ số lượng giác.", "triangle"],
  ["g9_circle_intro", "Bài 13. Mở đầu về đường tròn", "Đường tròn", "Nhận biết tâm, bán kính, đường kính, dây và quan hệ điểm với đường tròn.", "circle"],
  ["g9_arc_chord", "Bài 14. Cung và dây của một đường tròn", "Đường tròn", "Hiểu quan hệ giữa cung, dây và khoảng cách từ tâm đến dây.", "circle"],
  ["g9_arc_sector_area", "Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên", "Đường tròn", "Tính độ dài cung, diện tích quạt tròn và vành khuyên.", "circle"],
  ["g9_line_circle_position", "Bài 16. Vị trí tương đối của đường thẳng và đường tròn", "Đường tròn", "Phân biệt cát tuyến, tiếp tuyến và đường thẳng không cắt đường tròn.", "circle"],
  ["g9_two_circles_position", "Bài 17. Vị trí tương đối của hai đường tròn", "Đường tròn", "Nhận biết hai đường tròn cắt nhau, tiếp xúc hoặc không giao nhau qua khoảng cách tâm.", "circle"],
  ["g9_quadratic_function", "Bài 18. Hàm số y = ax^2 (a khác 0)", "Hàm số y = ax^2. Phương trình bậc hai một ẩn", "Nhận biết đồ thị parabol và tính giá trị hàm số y=ax^2.", "parabola"],
  ["g9_quadratic_equation", "Bài 19. Phương trình bậc hai một ẩn", "Hàm số y = ax^2. Phương trình bậc hai một ẩn", "Giải phương trình bậc hai bằng phân tích, căn bậc hai hoặc công thức nghiệm.", "parabola"],
  ["g9_viete", "Bài 20. Định lí Vi-ét và ứng dụng", "Hàm số y = ax^2. Phương trình bậc hai một ẩn", "Vận dụng hệ thức Vi-ét để tính tổng, tích nghiệm và nhẩm nghiệm.", "algebra"],
  ["g9_word_quadratic", "Bài 21. Giải bài toán bằng cách lập phương trình", "Hàm số y = ax^2. Phương trình bậc hai một ẩn", "Lập phương trình bậc hai từ bài toán thực tế và chọn nghiệm phù hợp.", "equationBalance"],
  ["g9_frequency_table", "Bài 22. Bảng tần số và biểu đồ tần số", "Tần số và tần số tương đối", "Lập bảng tần số và đọc biểu đồ tần số.", "frequency"],
  ["g9_relative_frequency", "Bài 23. Bảng tần số tương đối và biểu đồ tần số tương đối", "Tần số và tần số tương đối", "Tính tần số tương đối và biểu diễn dưới dạng phần trăm.", "frequency"],
  ["g9_grouped_frequency", "Bài 24. Bảng tần số, tần số tương đối ghép nhóm và biểu đồ", "Tần số và tần số tương đối", "Ghép nhóm dữ liệu, lập bảng tần số và đọc biểu đồ ghép nhóm.", "frequency"],
  ["g9_sample_space", "Bài 25. Phép thử ngẫu nhiên và không gian mẫu", "Xác suất của biến cố trong một số mô hình xác suất đơn giản", "Liệt kê không gian mẫu và xác định biến cố.", "probability"],
  ["g9_probability_models", "Bài 26. Xác suất của biến cố liên quan đến phép thử", "Xác suất của biến cố trong một số mô hình xác suất đơn giản", "Tính xác suất trong mô hình đồng khả năng đơn giản.", "probability"],
  ["g9_inscribed_angle", "Bài 27. Góc nội tiếp", "Đường tròn ngoại tiếp và đường tròn nội tiếp", "Nhận biết góc nội tiếp và quan hệ với cung bị chắn.", "circle"],
  ["g9_circum_incircle_triangle", "Bài 28. Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác", "Đường tròn ngoại tiếp và đường tròn nội tiếp", "Xác định tâm ngoại tiếp, tâm nội tiếp và bán kính liên quan.", "circle"],
  ["g9_cyclic_quadrilateral", "Bài 29. Tứ giác nội tiếp", "Đường tròn ngoại tiếp và đường tròn nội tiếp", "Nhận biết tứ giác nội tiếp và tính chất hai góc đối bù nhau.", "circle"],
  ["g9_regular_polygon", "Bài 30. Đa giác đều", "Đường tròn ngoại tiếp và đường tròn nội tiếp", "Nhận biết đa giác đều, góc ở tâm và liên hệ với đường tròn.", "geometry"],
  ["g9_cylinder_cone", "Bài 31. Hình trụ và hình nón", "Một số hình khối trong thực tiễn", "Nhận biết và tính diện tích, thể tích hình trụ, hình nón.", "solid"],
  ["g9_sphere", "Bài 32. Hình cầu", "Một số hình khối trong thực tiễn", "Nhận biết hình cầu, mặt cầu và tính diện tích, thể tích hình cầu.", "solid"]
];

const core = {
  system: ["Hai đường thẳng và nghiệm chung", "Nghiệm của hệ là cặp số làm đúng cả hai phương trình.", "Hệ x+y=5, x-y=1 có nghiệm x=3, y=2.", "Luôn thay nghiệm vào cả hai phương trình để kiểm tra."],
  equationBalance: ["Giữ cân bằng hai vế", "Biến đổi tương đương giúp phương trình hoặc bài toán giữ cùng nghiệm.", "2x+4=10 nên 2x=6 và x=3.", "Chọn nghiệm phù hợp điều kiện thực tế."],
  inequality: ["Chiều của bất đẳng thức", "Nhân hoặc chia hai vế với số âm thì đổi chiều bất đẳng thức.", "-2x<6 nên x>-3.", "Đổi chiều là lỗi dễ gặp nhất khi chia cho số âm."],
  radical: ["Căn và điều kiện", "Căn bậc hai cần biểu thức dưới căn không âm; căn bậc ba xác định với mọi số thực.", "sqrt(49)=7, căn bậc ba của -8 là -2.", "Tìm điều kiện xác định trước khi biến đổi căn."],
  triangle: ["Tam giác vuông và tỉ số", "Tỉ số lượng giác liên hệ góc nhọn với cạnh đối, cạnh kề và cạnh huyền.", "sin A = đối/huyền trong tam giác vuông.", "Xác định đúng góc đang xét trước khi chọn cạnh."],
  circle: ["Tâm, bán kính và cung", "Đường tròn tập hợp các điểm cách tâm một khoảng bằng bán kính.", "Nếu d từ tâm đến đường thẳng bằng R thì đường thẳng là tiếp tuyến.", "So sánh khoảng cách tâm với bán kính để nhận biết vị trí."],
  parabola: ["Parabol và nghiệm", "Hàm y=ax^2 tạo đồ thị parabol; phương trình bậc hai có thể có 0, 1 hoặc 2 nghiệm.", "x^2-5x+6=0 có nghiệm 2 và 3.", "Biệt thức Delta giúp xét số nghiệm."],
  algebra: ["Hệ thức nghiệm", "Với ax^2+bx+c=0, tổng nghiệm bằng -b/a và tích nghiệm bằng c/a nếu có nghiệm.", "x^2-5x+6=0 có tổng nghiệm 5, tích 6.", "Vi-ét chỉ áp dụng khi phương trình có nghiệm."],
  frequency: ["Đếm và so sánh tần suất", "Tần số là số lần xuất hiện; tần số tương đối là tỉ lệ so với tổng số quan sát.", "4 lần trên 20 quan sát có tần số tương đối 20%.", "Luôn chia cho tổng số dữ liệu."],
  probability: ["Không gian mẫu", "Xác suất bằng số kết quả thuận lợi chia số kết quả có thể khi đồng khả năng.", "Gieo xúc xắc ra số nguyên tố: 3/6 = 1/2.", "Liệt kê đủ kết quả có thể trước khi tính."],
  geometry: ["Đều quanh tâm", "Đa giác đều có các cạnh bằng nhau, các góc bằng nhau và gắn với đường tròn ngoại tiếp.", "Lục giác đều có góc ở tâm 60 độ.", "Góc ở tâm bằng 360 độ chia số cạnh."],
  solid: ["Từ mặt phẳng đến thể tích", "Hình trụ, nón, cầu dùng bán kính, chiều cao hoặc đường sinh để tính diện tích và thể tích.", "Thể tích trụ V=pi r^2 h.", "Chú ý hệ số 1/3 của hình nón và 4/3 của hình cầu."]
};

const q = {
  g9_linear_system_intro: [["multiple_choice", "Cặp số nào là nghiệm của x+y=5?", ["(2;3)", "(5;5)", "(1;1)", "(0;0)"], "(2;3)", "Thay x=2, y=3 được 5."], ["input", "Phương trình 2x+y=7 với x=3 thì y bằng bao nhiêu?", "1", "6+y=7."]],
  g9_solve_linear_system: [["input", "Giải hệ x+y=5, x-y=1. x bằng bao nhiêu?", "3", "Cộng hai phương trình được 2x=6."], ["multiple_choice", "Hệ x+y=4, x=1 có y bằng?", ["3", "4", "1", "5"], "3", "Thay x=1 vào x+y=4."]],
  g9_word_system: [["input", "Tổng hai số là 10, hiệu là 2. Số lớn là?", "6", "Giải hệ a+b=10, a-b=2."], ["multiple_choice", "Lập hệ thường cần mấy ẩn?", ["2", "1", "0", "4"], "2", "Hệ hai phương trình bậc nhất hai ẩn thường dùng hai ẩn."]],
  g9_equation_transform: [["input", "Giải 2(x+1)=10. x = ?", "4", "Chia 2 rồi trừ 1."], ["multiple_choice", "3x-6=0 có nghiệm?", ["2", "-2", "6", "3"], "2", "3x=6."]],
  g9_inequality_properties: [["multiple_choice", "Nhân hai vế bất đẳng thức với -2 thì chiều thế nào?", ["Đổi chiều", "Giữ nguyên", "Mất nghiệm", "Luôn bằng nhau"], "Đổi chiều", "Nhân với số âm phải đổi chiều."], ["input", "Điền dấu: nếu 3<5 thì -3 ___ -5", ">", "Đổi dấu hai số làm đảo thứ tự."]],
  g9_linear_inequality: [["input", "Giải -2x < 6. Điền nghiệm dạng x>-3 hay x<-3.", "x>-3", "Chia cho -2 phải đổi chiều."], ["multiple_choice", "x+4>7 tương đương?", ["x>3", "x<3", "x>11", "x<-3"], "x>3", "Trừ 4 hai vế."]],
  g9_square_root_expr: [["input", "sqrt(81) bằng bao nhiêu?", "9", "Căn bậc hai số học không âm."], ["multiple_choice", "sqrt(x-2) xác định khi nào?", ["x>=2", "x<2", "x=0", "mọi x"], "x>=2", "Biểu thức dưới căn phải không âm."]],
  g9_sqrt_product_quotient: [["input", "sqrt(4*9) bằng bao nhiêu?", "6", "sqrt(36)=6."], ["multiple_choice", "sqrt(25/9) bằng?", ["5/3", "25/3", "3/5", "5/9"], "5/3", "Khai căn tử và mẫu."]],
  g9_sqrt_simplify: [["input", "Rút gọn sqrt(12).", "2sqrt(3)", "12=4*3."], ["multiple_choice", "sqrt(50) bằng?", ["5sqrt(2)", "25sqrt(2)", "2sqrt(5)", "10"], "5sqrt(2)", "50=25*2."]],
  g9_cube_root_expr: [["input", "Căn bậc ba của -8 là?", "-2", "(-2)^3=-8."], ["multiple_choice", "cuberoot(27) bằng?", ["3", "-3", "9", "1/3"], "3", "3^3=27."]],
  g9_trig_ratios: [["multiple_choice", "Trong tam giác vuông, sin góc nhọn bằng?", ["cạnh đối/cạnh huyền", "cạnh kề/cạnh huyền", "cạnh đối/cạnh kề", "cạnh huyền/cạnh đối"], "cạnh đối/cạnh huyền", "Định nghĩa sin."], ["input", "Tam giác vuông có cạnh đối góc A là 3, huyền 5. sin A bằng?", "3/5", "sin = đối/huyền."]],
  g9_right_triangle_relations: [["input", "Cạnh huyền 10, sin A=3/5. Cạnh đối A bằng?", "6", "Đối = 10*3/5."], ["multiple_choice", "tan A bằng?", ["đối/kề", "kề/đối", "đối/huyền", "kề/huyền"], "đối/kề", "Định nghĩa tan."]],
  g9_circle_intro: [["input", "Đường kính bằng 10 thì bán kính bằng?", "5", "Bán kính bằng nửa đường kính."], ["multiple_choice", "Điểm cách tâm O đúng R thì nằm ở đâu?", ["Trên đường tròn", "Trong đường tròn", "Ngoài đường tròn", "Tại tâm"], "Trên đường tròn", "Định nghĩa đường tròn."]],
  g9_arc_chord: [["multiple_choice", "Trong một đường tròn, hai dây bằng nhau chắn các cung thế nào?", ["Bằng nhau", "Bù nhau", "Vuông góc", "Không liên quan"], "Bằng nhau", "Dây bằng nhau chắn cung bằng nhau."], ["input", "Đường kính có phải là dây không? trả lời có/không.", "có", "Đường kính là dây đi qua tâm."]],
  g9_arc_sector_area: [["input", "Độ dài cung 180 độ bán kính 2 là bao nhiêu theo pi?", "2pi", "Nửa chu vi: pi*r = 2pi."], ["multiple_choice", "Diện tích hình quạt 90 độ bằng mấy phần diện tích hình tròn?", ["1/4", "1/2", "1/3", "1/8"], "1/4", "90/360=1/4."]],
  g9_line_circle_position: [["multiple_choice", "Khoảng cách từ tâm đến đường thẳng bằng bán kính thì đường thẳng là?", ["Tiếp tuyến", "Cát tuyến", "Không cắt", "Đường kính"], "Tiếp tuyến", "d=R."], ["input", "Nếu d<R thì đường thẳng và đường tròn có mấy điểm chung?", "2", "Đó là cát tuyến."]],
  g9_two_circles_position: [["input", "Hai đường tròn tiếp xúc ngoài có số điểm chung là?", "1", "Tiếp xúc nghĩa là có một điểm chung."], ["multiple_choice", "Nếu khoảng cách hai tâm lớn hơn tổng hai bán kính thì hai đường tròn?", ["Không giao nhau", "Cắt nhau", "Tiếp xúc trong", "Trùng nhau"], "Không giao nhau", "Hai đường tròn ở ngoài nhau."]],
  g9_quadratic_function: [["input", "Với y=2x^2, khi x=3 thì y bằng?", "18", "2*9=18."], ["multiple_choice", "Đồ thị y=ax^2 là hình gì?", ["Parabol", "Đường thẳng", "Đường tròn", "Hình nón"], "Parabol", "Hàm bậc hai dạng này có đồ thị parabol."]],
  g9_quadratic_equation: [["input", "Giải x^2-9=0. Nghiệm dương là?", "3", "x=3 hoặc x=-3."], ["multiple_choice", "x^2-5x+6=0 có nghiệm?", ["2 và 3", "1 và 6", "-2 và -3", "0 và 6"], "2 và 3", "Phân tích (x-2)(x-3)=0."]],
  g9_viete: [["input", "Với x^2-5x+6=0, tổng hai nghiệm bằng?", "5", "Theo Vi-ét, S=-b/a=5."], ["multiple_choice", "Tích hai nghiệm của x^2-5x+6=0 là?", ["6", "5", "-5", "-6"], "6", "P=c/a=6."]],
  g9_word_quadratic: [["input", "Tích hai số tự nhiên liên tiếp là 30. Số nhỏ là?", "5", "5*6=30."], ["multiple_choice", "Khi lập phương trình thực tế, bước cuối cần làm gì?", ["Kiểm tra điều kiện nghiệm", "Bỏ đơn vị", "Luôn chọn nghiệm âm", "Không cần kết luận"], "Kiểm tra điều kiện nghiệm", "Nghiệm phải phù hợp bối cảnh."]],
  g9_frequency_table: [["input", "Dữ liệu có số 4 xuất hiện 7 lần. Tần số của 4 là?", "7", "Tần số là số lần xuất hiện."], ["multiple_choice", "Bảng tần số dùng để?", ["Đếm số lần xuất hiện", "Giải hệ", "Vẽ đường tròn", "Tính căn"], "Đếm số lần xuất hiện", "Mỗi giá trị đi với tần số."]],
  g9_relative_frequency: [["input", "4 lần trên 20 quan sát là bao nhiêu phần trăm?", "20%", "4/20=0,2=20%."], ["multiple_choice", "Tần số tương đối bằng?", ["tần số/tổng số", "tổng số/tần số", "tần số+ tổng", "tần số^2"], "tần số/tổng số", "Định nghĩa tần số tương đối."]],
  g9_grouped_frequency: [["multiple_choice", "Dữ liệu chiều cao nhiều giá trị nên làm gì để dễ đọc?", ["Ghép nhóm", "Bỏ dữ liệu", "Lấy căn", "Lập hệ"], "Ghép nhóm", "Ghép khoảng giúp bảng gọn hơn."], ["input", "Nhóm [150;160) có 8 bạn. Tần số nhóm là?", "8", "Tần số nhóm là số dữ liệu trong khoảng đó."]],
  g9_sample_space: [["input", "Tung một đồng xu, không gian mẫu có mấy kết quả?", "2", "Sấp hoặc ngửa."], ["multiple_choice", "Gieo xúc xắc, biến cố ra số chẵn gồm?", ["2,4,6", "1,3,5", "1,2", "6"], "2,4,6", "Các số chẵn trên xúc xắc."]],
  g9_probability_models: [["input", "Gieo xúc xắc, xác suất ra số nguyên tố là?", "1/2", "Số nguyên tố: 2,3,5 nên 3/6."], ["multiple_choice", "Túi có 3 đỏ, 2 xanh. Xác suất lấy đỏ là?", ["3/5", "2/5", "3/2", "1/5"], "3/5", "3 thuận lợi trên 5."]],
  g9_inscribed_angle: [["multiple_choice", "Góc nội tiếp bằng mấy phần số đo cung bị chắn?", ["1/2", "2", "1/3", "bằng nhau"], "1/2", "Định lí góc nội tiếp."], ["input", "Cung bị chắn 100 độ thì góc nội tiếp bằng bao nhiêu độ?", "50", "Lấy một nửa cung."]],
  g9_circum_incircle_triangle: [["multiple_choice", "Tâm ngoại tiếp tam giác là giao điểm của?", ["Ba đường trung trực", "Ba đường cao", "Ba trung tuyến", "Ba cạnh"], "Ba đường trung trực", "Tâm ngoại tiếp cách đều ba đỉnh."], ["input", "Tâm nội tiếp cách đều mấy cạnh tam giác?", "3", "Tâm nội tiếp cách đều ba cạnh."]],
  g9_cyclic_quadrilateral: [["input", "Tứ giác nội tiếp có hai góc đối tổng bằng bao nhiêu độ?", "180", "Hai góc đối bù nhau."], ["multiple_choice", "Nếu A+C=180 độ thì tứ giác có thể là?", ["Tứ giác nội tiếp", "Hình nón", "Phân thức", "Không gian mẫu"], "Tứ giác nội tiếp", "Đây là dấu hiệu quan trọng."]],
  g9_regular_polygon: [["input", "Góc ở tâm của lục giác đều bằng bao nhiêu độ?", "60", "360/6=60."], ["multiple_choice", "Đa giác đều có các cạnh thế nào?", ["Bằng nhau", "Tất cả khác nhau", "Luôn cong", "Không có góc"], "Bằng nhau", "Đa giác đều có cạnh và góc bằng nhau."]],
  g9_cylinder_cone: [["input", "Thể tích hình trụ bán kính 2, cao 5 bằng bao nhiêu theo pi?", "20pi", "V=pi*r^2*h=pi*4*5."], ["multiple_choice", "Thể tích hình nón có hệ số nào?", ["1/3", "1/2", "2", "4/3"], "1/3", "V nón = 1/3*pi*r^2*h."]],
  g9_sphere: [["multiple_choice", "Thể tích hình cầu bán kính r là?", ["4/3*pi*r^3", "pi*r^2*h", "1/3*pi*r^2*h", "2*pi*r"], "4/3*pi*r^3", "Công thức thể tích hình cầu."], ["input", "Mặt cầu bán kính 3 có diện tích bao nhiêu theo pi?", "36pi", "S=4*pi*r^2=36pi."]]
};

const errors = [
  ["g9_solve_linear_system", "2", "system_error", "Giải hệ mới tìm một ẩn", "Bạn cần tìm đủ cả x và y, rồi kiểm tra cả hai phương trình.", "Sau khi tìm x, thay lại để tìm y."],
  ["g9_linear_inequality", "x<-3", "inequality_sign_error", "Quên đổi chiều bất phương trình", "Khi chia cho số âm phải đổi chiều.", "-2x<6 nên x>-3."],
  ["g9_square_root_expr", "-9", "sqrt_domain_error", "Căn bậc hai số học không âm", "sqrt(81) bằng 9, không phải -9.", "Căn bậc hai số học luôn không âm."],
  ["g9_sqrt_simplify", "sqrt(12)", "radical_simplify_error", "Chưa đưa thừa số ra ngoài căn", "12 có thừa số chính phương là 4.", "sqrt(12)=2sqrt(3)."],
  ["g9_trig_ratios", "3/4", "trig_ratio_error", "Chọn nhầm cạnh trong tỉ số lượng giác", "sin dùng cạnh đối trên cạnh huyền.", "Xác định góc đang xét trước."],
  ["g9_arc_sector_area", "4pi", "arc_length_error", "Nhầm cung 180 độ với cả đường tròn", "Cung 180 độ chỉ là nửa chu vi.", "Độ dài bằng pi*r."],
  ["g9_quadratic_equation", "3", "missing_root_error", "Thiếu nghiệm còn lại", "x^2-9=0 có hai nghiệm đối nhau.", "x=3 hoặc x=-3."],
  ["g9_viete", "-5", "viete_sign_error", "Sai dấu tổng nghiệm Vi-ét", "Tổng nghiệm bằng -b/a.", "Với x^2-5x+6=0, tổng là 5."],
  ["g9_relative_frequency", "4%", "relative_frequency_error", "Tính phần trăm chưa đúng", "4/20 bằng 20%, không phải 4%.", "Chia trước rồi đổi sang phần trăm."],
  ["g9_inscribed_angle", "100", "inscribed_angle_error", "Nhầm góc nội tiếp với cung", "Góc nội tiếp bằng một nửa cung bị chắn.", "100 độ cung cho góc 50 độ."],
  ["g9_cyclic_quadrilateral", "360", "cyclic_quad_error", "Nhầm tổng hai góc đối", "Trong tứ giác nội tiếp, hai góc đối bù nhau.", "Tổng hai góc đối là 180 độ."],
  ["g9_cylinder_cone", "60pi", "cone_cylinder_error", "Nhầm công thức trụ và nón", "Hình nón có thêm hệ số 1/3.", "V nón = 1/3*pi*r^2*h."],
  ["g9_sphere", "9pi", "sphere_area_error", "Thiếu hệ số 4 trong diện tích mặt cầu", "Diện tích mặt cầu là 4*pi*r^2.", "Với r=3, S=36pi."]
];

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const chapters = [...new Set(grade9.map((item) => item[2]))];

function makeSkill(item, index) {
  const [id, title, chapter, description, visualization] = item;
  const lessonNo = Number(title.match(/Bài (\d+)/)?.[1] || index + 1);
  return {
    id,
    title,
    grade: 9,
    book: lessonNo <= 17 ? "Tập 1" : "Tập 2",
    chapter,
    chapterIndex: chapters.indexOf(chapter) + 1,
    lessonNo,
    domain: chapter,
    level: lessonNo < 11 ? 4 : 5,
    prerequisite: index === 0 ? [] : [grade9[index - 1][0]],
    description,
    visualization
  };
}

function makeLesson([id, title, chapter, description, visualization]) {
  const [visualTitle, visualContent, example, summary] = core[visualization] || core.algebra;
  const lessonNo = Number(title.match(/Bài (\d+)/)?.[1] || 1);
  return {
    id,
    title,
    skill: id,
    chapter,
    source: "Bám mạch SGK Toán 9 - Kết nối tri thức với cuộc sống, nội dung và câu hỏi tự biên soạn.",
    xp: lessonNo < 18 ? 90 : 100,
    steps: [
      { type: "intro", title: "Mục tiêu vi kỹ năng", content: description },
      { type: "visualization", title: visualTitle, content: visualContent, visualization },
      { type: "example", title: "Ví dụ tự tạo", content: example },
      makeKeypointsStepFromCore([visualTitle, visualContent, example, summary]),
      { type: "summary", title: "Ghi nhớ nhanh", content: summary }
    ]
  };
}

function makeQuestions([id]) {
  return q[id].map(([type, question, choicesOrAnswer, answerOrHint, maybeHint], index) => {
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

function upsertById(existing, incoming) {
  const map = new Map(existing.map((item) => [item.id, item]));
  incoming.forEach((item) => map.set(item.id, item));
  return [...map.values()];
}

const existingSkills = await readJson(paths.skills);
const existingLessons = await readJson(paths.lessons);
const existingQuestions = await readJson(paths.questions);
const existingErrors = await readJson(paths.errors);

const nextSkills = grade9.map(makeSkill);
const nextLessons = grade9.map(makeLesson);
const nextQuestions = grade9.flatMap(makeQuestions);
const nextErrors = errors.map(([skill, pattern, errorType, title, message, hint]) => ({
  pattern,
  skill,
  errorType,
  title,
  message,
  hint,
  recommendation: skill
}));

await writeFile(paths.skills, `${JSON.stringify(upsertById(existingSkills, nextSkills), null, 2)}\n`);
await writeFile(paths.lessons, `${JSON.stringify(upsertById(existingLessons, nextLessons), null, 2)}\n`);
await writeFile(paths.questions, `${JSON.stringify(upsertById(existingQuestions, nextQuestions), null, 2)}\n`);
await writeFile(paths.errors, `${JSON.stringify([...existingErrors.filter((item) => !nextErrors.some((next) => next.skill === item.skill && next.pattern === item.pattern)), ...nextErrors], null, 2)}\n`);

console.log(`Added ${nextSkills.length} grade 9 skills, ${nextLessons.length} lessons, ${nextQuestions.length} questions, ${nextErrors.length} error patterns.`);
