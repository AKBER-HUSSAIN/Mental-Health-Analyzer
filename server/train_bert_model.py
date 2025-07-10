import os
import pandas as pd
import torch
from datasets import Dataset
from transformers import (
    DistilBertTokenizerFast,
    DistilBertForSequenceClassification,
    Trainer,
    TrainingArguments,
    DataCollatorWithPadding
)
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("data/train.txt", sep=';', names=["text", "emotion"])
df_test = pd.read_csv("data/test.txt", sep=';', names=["text", "emotion"])

# Encode emotion labels
le = LabelEncoder()
df["label"] = le.fit_transform(df["emotion"])
df_test["label"] = le.transform(df_test["emotion"])

# Save label map
label_map = dict(zip(le.classes_, le.transform(le.classes_)))
os.makedirs("model", exist_ok=True)
with open("model/label_map.txt", "w") as f:
    f.write(str(label_map))

# Convert to Hugging Face Datasets
train_dataset = Dataset.from_pandas(df[["text", "label"]])
test_dataset = Dataset.from_pandas(df_test[["text", "label"]])

# Load tokenizer and model
tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
model = DistilBertForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=len(label_map)
)

# Tokenization function (NO padding here!)
def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, max_length=128)

# Tokenize datasets
train_dataset = train_dataset.map(tokenize, batched=True)
test_dataset = test_dataset.map(tokenize, batched=True)

# Use data collator to dynamically pad during batching
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# Training arguments
training_args = TrainingArguments(
    output_dir="./model/bert",
    evaluation_strategy="epoch",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=4,
    save_total_limit=1,
    logging_dir="./logs"
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    data_collator=data_collator  # ✅ Important!
)

# Train
trainer.train()

# Save model + tokenizer
model.save_pretrained("model/bert")
tokenizer.save_pretrained("model/bert")

print("✅ DistilBERT model trained and saved to model/bert/")
