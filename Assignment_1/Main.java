    import java.util.Random;
import java.util.random.*;
    public class Main{
        public static Integer[] orderedArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++)array[i]=(i);
            return array;
        } 
        public static Integer[] reverseArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=size;i>=0;i--)array[i]=(i);
            return array;
        } 
        public static Integer[] randomArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++){
                Random random= new Random();
                Integer randomInt = random.nextInt(100);
                array[i]=randomInt;
            }
            return array;
        } 
        public static Sorter<Integer> chooseSorting(Integer sortingAlg){
            switch (sortingAlg) {
                case 1:
                    return Sorter<Integer> sorting=new BubbleSortUntilNoChange<>();
                    break;
                case 2:
                    return Sorter<Integer> sorting=new BubbleSortUntilNoChange<>();
                    break;
                case 3:
                    return Sorter<Integer> sorting=new BubbleSortUntilNoChange<>();
                    break;
                case 4:
                    return Sorter<Integer> sorting=new BubbleSortUntilNoChange<>();
                    break;
            }
        }
        public static void main(String[] args){
            long startTime = System.nanoTime();
            //bubblesortnochange=1
            //bubblesortwhileneeded=2
            //quicksortgpt=3
            //selectionsortgpt=4
            
            chooseSorting(null).sort(orderedArray(10));
            long endTime = System.nanoTime();  
            System.out.println("It took " + (endTime - startTime)+"ns");
        } 
    }