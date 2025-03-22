import kagglehub


if __name__ == "__main__":
    kagglehub.dataset_download(
        handle="mohamedbakhet/amazon-books-reviews",
        path="../../data/amazon-books-reviews",
    )
