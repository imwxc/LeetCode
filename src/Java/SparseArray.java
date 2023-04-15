
import java.util.ArrayList;
class SparseArray extends DataStruct{
    public SparseArray(){super();};
       //稀疏数组：记录原数组行列数，将不同值元素行列及值记录在小规模数组中
    /**
     * ----------------------------------------------------------------
     *   row  |    col   |  val  |
     * ----------------------------------------------------------------
     *   1    |    2     | 3     |
     * ----------------------------------------------------------------
     *   4    |    6     | 7     |
     * ----------------------------------------------------------------
     *   5    |    5     | 8     |
     * ----------------------------------------------------------------
     *   6    |    4     | 1     |
     * ----------------------------------------------------------------
     */
    public int[][] TwoDarray_to_SparseArray(int twoDarray[][]) {
        /**
         * 1.遍历二维数组得到有效数据个数 sum
         * 2.根据sum 创建稀疏数组 sparseArray = int[sum+1][3]
         * 3.将二维数组的有效数据存到稀疏数组中
         * 4.稀疏数组保存到文件中
         */
        int twoDarr[][];
        if (twoDarray == null) {
            twoDarr= new int[11][11];
        }else{
            twoDarr= twoDarray;
        }
        
        twoDarr[1][2] =1;
        twoDarr[2][4] = 5;
        //输出二维数组
        // for(int[] row : twoDarr){
        //     System.out.printf("\n");
        //     for(int data:row){
        //         System.out.printf("%d\t",data);
        //     }
        // }
        // 遍历
        int sum = 0;
        int weight=twoDarr.length;
        int height=twoDarr[0].length;
        for(int i=0;i<weight;i++){
            for(int j=0;j<height;j++){
                if(twoDarr[i][j]!=0){
                    sum++;
                }
            }
        }
        
        int sparseArr[][]=new int[sum+1][3];
        sparseArr[0][0]=weight;
        sparseArr[0][1]=height;
        sparseArr[0][2]=sum;
        //将2维数组的值放到稀疏数组中
        int count=0;
        for(int i=0;i<11;i++){
            for(int j=0;j<11;j++){
                if(twoDarr[i][j]!=0){
                    count++;
                    sparseArr[count][0]=i;
                    sparseArr[count][1]=j;
                    sparseArr[count][2]=twoDarr[i][j];
                }
            }
        }

        //输出稀疏数组
        // System.out.println("\n得到的稀疏数组为");
        // System.out.println("row    col    val");
        // System.out.printf("%d\t%d\t%d\n",sparseArr[0][0],sparseArr[0][1],sparseArr[0][2]);
        // System.out.println("-----------------");
        // for (int i = 1; i <sparseArr.length;i++){
        //     System.out.printf("%d\t%d\t%d\n",sparseArr[i][0],sparseArr[i][1],sparseArr[i][2]);
        // }
        return sparseArr;
    }
    
    public int[][] SparseArray_to_2DArray(int[][] spArr) {
        /**
         * 1.读取稀疏数组的第一行，创建原始的二维数组
         * 2.读取稀疏数组后面行，赋给二维数组
         */
        int sparseArr[][];
        if (spArr == null) {
            sparseArr=new int[][]{{11,11,2},{1,2,1},{2,4,5}};
        }else{
            sparseArr=spArr;
        }
        System.out.println("\n得到的稀疏数组为");
        System.out.println("row    col    val");
        System.out.printf("%d\t%d\t%d\n",sparseArr[0][0],sparseArr[0][1],sparseArr[0][2]);
        System.out.println("-----------------");
        for (int i = 1; i <sparseArr.length;i++){
            System.out.printf("%d\t%d\t%d\n",sparseArr[i][0],sparseArr[i][1],sparseArr[i][2]);
        }
        int weight=sparseArr[0][0];
        int height=sparseArr[0][1];
        
        int sum=sparseArr[0][2];
        int twoDarray[][]=new int[weight][height];
        for(int i=1;i<=sum;i++) {
            twoDarray[sparseArr[i][0]][sparseArr[i][1]]=sparseArr[i][2];
        }
        for(int[] row : twoDarray){
            System.out.printf("\n");
            for(int data:row){
                System.out.printf("%d\t",data);
            }
        }
         return twoDarray;
        
    }
    public static void main(String[] args) {
        SparseArray arr=new SparseArray();

        int spArr[][]=arr.TwoDarray_to_SparseArray(null);
        arr.SparseArray_to_2DArray(spArr);
    }
}