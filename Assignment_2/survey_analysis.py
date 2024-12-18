# Import necessary libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import ttest_ind
import json
import os

# Load JSON data
file_path = "survey_responses.json"  # Replace with your file path
with open(file_path, "r") as f:
    data = json.load(f)

# Flatten JSON into a DataFrame
rows = []
for participant in data:
    general_info = participant["generalInfo"]
    for response in participant["responses"]:
        rows.append({
            "Age": general_info["age"],
            "CodingExperience": general_info["hasCodingExperience"],
            "CodingFrequency": general_info["codingFrequency"],
            "Style": response["style"],
            "ResponseTime": response["responseTime"],
            "Trials": response["trials"],
            "WordCount": len(response["sentence"].split())
        })
df = pd.DataFrame(rows)

# Group coding experience and age into broader categories
df["CodingGroup"] = df["CodingFrequency"].apply(
    lambda x: "Frequent" if x in ["Daily", "Weekly"] else "Less/None")
df["AgeGroup"] = df["Age"].apply(
    lambda x: "<18" if x == "<18" else "18-34" if x in ["18-24", "25-34"] else "35+")

# Output folder
output_folder = "results/"
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Function to perform t-tests and collect stats into a dictionary


def get_analysis(group1, group2, label1, label2):
    t_stat, p_value = ttest_ind(group1, group2, equal_var=False)
    return {
        "Group 1": label1,
        "Group 2": label2,
        "Mean Group 1": group1.mean(),
        "Mean Group 2": group2.mean(),
        "Min Group 1": group1.min(),
        "Max Group 1": group1.max(),
        "Min Group 2": group2.min(),
        "Max Group 2": group2.max(),
        "Median Group 1": group1.median(),
        "Median Group 2": group2.median(),
        "Q1 Group 1": group1.quantile(0.25),
        "Q3 Group 1": group1.quantile(0.75),
        "Q1 Group 2": group2.quantile(0.25),
        "Q3 Group 2": group2.quantile(0.75),
        "T-Statistic": t_stat,
        "P-Value": p_value
    }


# Initialize lists for summary results and t-test results
summary_results = []
t_test_results = []

# 1. Overall Comparison
kebab = df[df["Style"] == "kebab-case"]["ResponseTime"]
camel = df[df["Style"] == "camelCase"]["ResponseTime"]
analysis = get_analysis(kebab, camel, "Kebab-case", "CamelCase")
summary_results.append(analysis)
t_test_results.append({
    "Comparison": "Overall: Kebab-case vs CamelCase",
    "T-Statistic": analysis["T-Statistic"],
    "P-Value": analysis["P-Value"]
})
sns.violinplot(data=df, x="Style", y="ResponseTime",
               hue="Style", palette="coolwarm", legend=False)
# plt.title("Violin Plot: Overall Comparison of Response Times")
plt.savefig(f"{output_folder}overall_comparison_violin.png")
plt.close()

# 2. Grouped by Coding Experience
for group, group_data in df.groupby("CodingGroup"):
    kebab = group_data[group_data["Style"] == "kebab-case"]["ResponseTime"]
    camel = group_data[group_data["Style"] == "camelCase"]["ResponseTime"]
    analysis = get_analysis(
        kebab, camel, f"Kebab-case ({group})", f"CamelCase ({group})")
    summary_results.append(analysis)
    t_test_results.append({
        "Comparison": f"Coding Experience ({group})",
        "T-Statistic": analysis["T-Statistic"],
        "P-Value": analysis["P-Value"]
    })
sns.boxplot(data=df, x="CodingGroup", y="ResponseTime",
            hue="Style", palette="husl")
# plt.title("Box Plot: Response Times by Coding Experience")
plt.savefig(f"{output_folder}coding_experience_boxplot.png")
plt.close()

# 3. Grouped by Word Count
for word_count, group_data in df.groupby("WordCount"):
    kebab = group_data[group_data["Style"] == "kebab-case"]["ResponseTime"]
    camel = group_data[group_data["Style"] == "camelCase"]["ResponseTime"]
    analysis = get_analysis(
        kebab, camel, f"Kebab-case ({word_count} words)", f"CamelCase ({word_count} words)")
    summary_results.append(analysis)
    t_test_results.append({
        "Comparison": f"Word Count ({word_count})",
        "T-Statistic": analysis["T-Statistic"],
        "P-Value": analysis["P-Value"]
    })
sns.catplot(data=df, x="WordCount", y="ResponseTime", hue="Style",
            kind="violin", split=True, palette="muted", aspect=1.5, height=6)
# plt.title("Violin Plot: Response Times by Word Count")
plt.tight_layout()
plt.savefig(f"{output_folder}word_count_violin.png", bbox_inches="tight")
plt.close()


# 4. Grouped by Age Group
for age_group, group_data in df.groupby("AgeGroup"):
    kebab = group_data[group_data["Style"] == "kebab-case"]["ResponseTime"]
    camel = group_data[group_data["Style"] == "camelCase"]["ResponseTime"]
    analysis = get_analysis(
        kebab, camel, f"Kebab-case ({age_group})", f"CamelCase ({age_group})")
    summary_results.append(analysis)
    t_test_results.append({
        "Comparison": f"Age Group ({age_group})",
        "T-Statistic": analysis["T-Statistic"],
        "P-Value": analysis["P-Value"]
    })
sns.boxplot(data=df, x="AgeGroup", y="ResponseTime",
            hue="Style", palette="Set2")
# plt.title("Box Plot: Response Times by Age Group")
plt.savefig(f"{output_folder}age_group_boxplot.png")
plt.close()

# Save Scatter Plot
plt.figure(figsize=(12, 8))
sns.scatterplot(data=df, x="WordCount", y="ResponseTime",
                hue="Style", style="CodingGroup", palette="Dark2", s=100)
# plt.title("Scatter Plot: Response Times by Word Count and Style")
plt.xlabel("Number of Words in Identifier")
plt.ylabel("Response Time (ms)")
plt.legend(title="Style and Coding Group",
           bbox_to_anchor=(1.05, 1), loc="upper left")
plt.tight_layout()
plt.savefig(f"{output_folder}word_count_scatter.png", bbox_inches="tight")
plt.close()

# Save Results to CSV and JSON
summary_df = pd.DataFrame(summary_results)
summary_df.to_csv(f"{output_folder}summary_results.csv", index=False)
t_test_df = pd.DataFrame(t_test_results)
t_test_df.to_csv(f"{output_folder}t_test_results.csv", index=False)

# Fix JSON Serialization for int64 and float64
summary_json = summary_df.astype(object).where(
    pd.notnull(summary_df), None).to_dict(orient="records")
t_test_json = t_test_df.astype(object).where(
    pd.notnull(t_test_df), None).to_dict(orient="records")

with open(f"{output_folder}summary_results.json", "w") as f:
    json.dump(summary_json, f, indent=4)

with open(f"{output_folder}t_test_results.json", "w") as f:
    json.dump(t_test_json, f, indent=4)


ages = [0, 0, 0, 0]
experiences = [0, 0, 0, 0, 0]
for responses in data:
    responses = responses['generalInfo']
    age = responses['age']
    exp = responses['codingFrequency']
    if (age == "<18"):
        ages[0] += 1
    elif (age == "18-24"):
        ages[1] += 1
    elif (age == "25-34"):
        ages[2] += 1
    else:
        ages[3] += 1
    if (exp == "Daily"):
        experiences[0] += 1
    elif (exp == "Weekly"):
        experiences[1] += 1
    elif (exp == "Monthly"):
        experiences[2] += 1
    elif (exp == "Rarely"):
        experiences[3] += 1
    else:
        experiences[4] += 1


print("Analysis complete! Results saved to the 'results/' folder. \nHere you can find some quick statistics of the data you gathered so far.\n")
print("Age Distribution:")
print("<18: ", ages[0])
print("18-24: ", ages[1])
print("25-34: ", ages[2])
print(">34: ", ages[3])

print("\nExperience Distribution:")
print("Daily: ", experiences[0])
print("Weekly: ", experiences[1])
print("Monthly: ", experiences[2])
print("Rarely: ", experiences[3])
