public final class SelectionSortGPT<T extends Comparable<T>> implements Sorter<T> {
	
	public void sort(final T[] items) {
		if (items == null || items.length == 0) {
            return; 
        }

        int n = items.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (items[j].compareTo(items[minIndex]) < 0) {
                    minIndex = j; 
                }
            }

            if (minIndex != i) {
                swap(items, i, minIndex);
            }
        }
	}

	private static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	
}
