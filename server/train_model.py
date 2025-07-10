import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib
import os

def load_data(file_path):
    data = []
    labels = []
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip() and not line.startswith('#'):
                text, label = line.strip().split(';')
                data.append(text)
                labels.append(label)
    return data, labels

train_data, train_labels = load_data('data/train.txt')
val_data, val_labels = load_data('data/val.txt')

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

pipeline.fit(train_data, train_labels)

val_score = pipeline.score(val_data, val_labels)
print(f'Validation accuracy: {val_score:.2f}')

os.makedirs('model', exist_ok=True)
joblib.dump(pipeline, 'model/emotion_model.pkl')
print('Model saved to model/emotion_model.pkl')
