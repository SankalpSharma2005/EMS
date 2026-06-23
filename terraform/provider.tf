terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = "752a1362-9a87-4290-851f-9832dd695cf0"

  resource_provider_registrations = "none"
}