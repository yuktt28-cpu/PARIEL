import java.util.Scanner;

public class newy {
    public static void main(String[] args) {
        Scanner yukt = new Scanner(System.in);

        System.out.println("Enter the first number: ");
        int a = Integer.parseInt(yukt.nextLine());

        System.out.println("Enter the second number: ");
        int b = yukt.nextInt();

        int sum = a + b;

        System.out.println(sum + " is the sum of " + a + " and " + b);
    }
}
