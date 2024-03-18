export function sortData(data, column, sortOrder) {
 // 정렬된 데이터를 새로운 배열에 저장
 const sortedData = [...data];

 // 정렬에 사용할 비교 함수
 const compareFunction = (a, b) => {
   if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
   if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
   return 0;
 };

 // 데이터 정렬
 sortedData.sort(compareFunction);

 return sortedData;
}