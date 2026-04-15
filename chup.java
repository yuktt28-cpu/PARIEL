import java.util.Arrays;

class chup {
    public static void main(String[] args) {

       int arr[] = {4, 24, 12, 22, 11};

       for (int i =1; i<arr.length; i++){
          int curr = arr[i];
          int prevs = i-1;

        while (prevs>=0 && arr[prevs]>curr){
            arr[prevs+1] = arr[prevs];
            prevs = prevs-1;
        }
        arr[prevs+1] = curr;
       }
       System.out.println(Arrays.toString(arr));
    }
}