import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
        int m=sc.nextInt();
        int q=sc.nextInt();
        int[][] map = new int[n][m];
        int len[]=new int[n];
        for (int i=0; i<n; i++){
            for (int j=0; j<m; j++){
                map[i][j]=sc.nextInt();
            }
        }
        for (int k=0; k<q; k++){
            int i=sc.nextInt()-1;
            int j=sc.nextInt()-1;

            if (map[i][j]==0){
                map[i][j]=1;
            }else if(map[i][j]==1){
                map[i][j]=0;
            }
            for (int index=0;i<n; i++){
                int[] arr=map[index];
                for (int tt=1;tt<=m;tt++){
                    if(arr[tt-1]==arr[tt]&&arr[tt]==1){
                        len[index]+=1;
                    }else{
                        len[index]=0;
                    }
                }
            }
            int max=0;
            for (int e =0;e<n;e++){
                if(max<len[e]){
                    max=len[e];
                }
            }
            System.out.println(max);


        }
    }}
    // 5 4 5 
    // 0 1 1 0 
    // 1 0 0 1 
    // 0 1 1 0 
    // 1 0 0 1 
    // 0 0 0 0 
    // 1 1 
    // 1 4 
    // 1 1 
    // 4 2 
    // 4 3

    // ----------------------------

    // 3 
    // 4 
    // 3 
    // 3 
    // 4