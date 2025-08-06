from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/students")
    page.screenshot(path="jules-scratch/verification/initial_page.png")
    add_button = page.locator('button:has-text("Adicionar Aluno")')
    add_button.wait_for()
    add_button.click()
    page.screenshot(path="jules-scratch/verification/form_page.png")
    page.fill('input[placeholder="Nome Completo"]', "John Doe")
    page.fill('input[placeholder="Matrícula"]', "123456")
    page.fill('input[placeholder="Email"]', "john.doe@example.com")
    page.fill('input[placeholder="Curso"]', "Computer Science")
    page.screenshot(path="jules-scratch/verification/form_filled_page.png")
    browser.close()
