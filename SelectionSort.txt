import java.util.Arrays;

class Main {
    public static void main(String[] args) {

        int arr[] = {64, 25, 12, 22, 11};

        Arrays.sort(arr); // sorting

        // print sorted array
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}