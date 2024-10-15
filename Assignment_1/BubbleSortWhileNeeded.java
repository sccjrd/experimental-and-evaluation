public final class BubbleSortWhileNeeded<T extends Comparable<T>> implements Sorter<T> {

	public void sort(final T[] items) {
		int n = items.length;

		do {
			int maxIndex = 0;
			for (int i = 1; i < n; i++) {
				if (items[i - 1].compareTo(items[i]) > 0) {
					final T item = items[i - 1];
					items[i - 1] = items[i];
					items[i] = item;
					maxIndex = i;
				}
			}
			n = maxIndex;
		} while (n > 0);

	}
	
}

