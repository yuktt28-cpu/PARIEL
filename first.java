import java.util.Arrays;
import java.util.Scanner;

public class first {

    // Recursive function to take input
    public static void takeInput(int[] arr, int index, Scanner sc) {
        if (index == arr.length) {   // base case
            return;
        }

        arr[index] = sc.nextInt();   // work
        takeInput(arr, index + 1, sc);  // recursive call
    }

    public static void main (String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the size of the array: ");
        int size = sc.nextInt();

        int[] arr = new int[size];

        System.out.println("Enter the elements of the array: ");

        takeInput(arr, 0, sc);   // calling recursion

        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));
    }
}