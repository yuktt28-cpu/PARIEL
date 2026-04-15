import java.util.Scanner;
public class baba {
    public static void main(String[] args) {
        Scanner baba = new Scanner(System.in);

        System.out.println("Enter the first number: ");
        int a = Integer.parseInt(baba.nextLine());

        System.out.println("Enter the second number: ");
        int b = baba.nextInt();

        int multi = a * b;

        System.out.println(multi + "\t" +"the number is this");
    }
}
