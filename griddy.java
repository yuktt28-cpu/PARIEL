class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.length;
        int index = -1;
        int max = Integer.MIN_VALUE;

        int carry= 0;

        for(int i=n-1;i>=0;i--){
            carry=carry+gas[i]-cost[i];
            if(carry>=max){
                max=carry;
                index=i;
            }
        }

        return carry>=0?index:-1;
        
    }
}